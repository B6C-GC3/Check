using Abp.Runtime.Session;
using ApiProject.MappingExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.CategoryProduct;
using ApiProject.Shared.DataTransfer.ProductAttribute;
using ApiProject.Shared.Entitys;
using Castle.MicroKernel.Registration;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;
using static System.Net.WebRequestMethods;

namespace ApiProject.Administrators.Attribute
{
    public class AttributeAppService : IAttributeAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public AttributeAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpPut]
        public async Task<int> ChangeActive(long id)
        {
            var productAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                    .GetFirstOrDefaultAsync(predicate: p => p.Id == id);

            if (productAttribute == null) throw new ClientException("productAttribute", ERROR_DATA.DATA_NULL);
            if (productAttribute.IsDeleted) throw new ClientException("productAttribute", ERROR_DATA.UNKNOWN);

            productAttribute.IsActive = !productAttribute.IsActive;
            _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().Update(productAttribute);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpPut]
        public async Task<int> ChangeCategory(ProductAttributeChangeCategoryDto input)
        {
            var productAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                    .GetFirstOrDefaultAsync(predicate: p => p.Id == input.Id);
            // kiểm tra name && category new
            var isNameProductAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                          .ExistsAsync(p => p.Name.ToUpper() == productAttribute.Name.ToUpper()
                                                                         && p.CategoryProductId == (int)input.CategoryId);
            if (isNameProductAttribute) throw new ClientException("productAttribute", ERROR_DATA.EXIST);

            // kiểm tra category 
            var isCategory = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                              .ExistsAsync(p => p.Id != input.CategoryId);
            if (isCategory) throw new ClientException("Category", ERROR_DATA.DATA_NULL);

            productAttribute.CategoryProductId = (int)input.CategoryId;
            _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().Update(productAttribute);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpPut]
        public async Task<int> ChangeType(ProductAttributeChangeTypesDto input)
        {
            var productAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                    .GetFirstOrDefaultAsync(predicate: p => p.Id == input.Id);
            // kiểm tra name && type new
            var isNameProductAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                          .ExistsAsync(p => p.Name.ToUpper() == productAttribute.Name.ToUpper()
                                                                         && p.CategoryProductId == (int)input.Types);
            if (isNameProductAttribute) throw new ClientException("productAttribute", ERROR_DATA.EXIST);

            productAttribute.Types = (int)input.Types;
            _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().Update(productAttribute);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpGet]
        public async Task<ProductAttributeDetailDto> GetDetail(long id)
        {
            var productAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                    .GetFirstOrDefaultAsync(predicate: p => p.Id == id && p.IsDeleted == false);
            if (productAttribute == null) throw new ClientException("productAttribute", ERROR_DATA.DATA_NULL);
            return MappingData.InitializeAutomapper().Map<ProductAttributeDetailDto>(productAttribute);
        }

        [HttpGet]
        public async Task<IPagedList<ProductAttributeDto>> GetPageList(SearchRequest input)
        {
            // input.ValuesSearch[0] : Types Attribute
            // input.ValuesSearch[1] : ValueSearch
            string sqlQuery = $@"
                                 SELECT cp.Id AS ""Id""
                                 	  ,cp.Name AS ""Name""
                                 	  ,cp.IsActive AS ""IsActive""
                                 	  ,cp.Types AS ""Types""
                                 	  ,cp.CategoryProductId AS ""CategoryProductId""
                                 	  ,(SELECT cp2.Name FROM CategoryProduct cp2 WHERE cp2.Id = cp.CategoryProductId) AS ""CategoryProductName""
                                 	  ,cp.LastModifierUserId AS ""LastModifierUserId""
                                       ,cp.LastModificationTime AS ""lastModificationTime""
                                 	  ,(SELECT aua.UserName FROM AbpUserAccounts aua WHERE aua.Id = cp.LastModifierUserId) AS ""LastModifierUserName""
                                 FROM  [Attribute] cp
                                 WHERE cp.IsDeleted = 0
                                   AND cp.Types = {input.ValuesSearch[0].ToUpper()} 
                                 {(input.ValuesSearch == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[1] == null
                                 ? ""
                                 : $" AND cp.Name LIKE '%{input.ValuesSearch[1].ToUpper()}%' ")}
                                 ORDER BY {(string.IsNullOrEmpty(input.PropertyOrder)
                                 ? "cp.Name"
                                 : $"cp.{(input.PropertyOrder)} {(input.ValueOrderBy ? "ASC" : "DESC")}")}";

            var data = await _unitOfWork.FromSqlPageListAsync<ProductAttributeDto>(
                sql: sqlQuery,
                orderBy: "cp.Name",
                pageIndex: input.PageIndex,
                pageSize: input.PageSize);
            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }

        [HttpPost]
        public async Task<int> Insert(ProductAttributeInsertDto input)
        {
            // kiểm tra category
            var isCategory = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                              .ExistsAsync(p => p.Id != input.CategoryProductId);
            if (isCategory) throw new ClientException("Category", ERROR_DATA.DATA_NULL);
            // kiểm tra name && type
            var isNameProductAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                          .ExistsAsync(p => p.Name.ToUpper() == input.Name.ToUpper()
                                                                         && p.Types == (int)input.Types
                                                                         && p.CategoryProductId == input.CategoryProductId);
            if (isNameProductAttribute) throw new ClientException("ProductAttribute", ERROR_DATA.DATA_NULL);
            // insert
            var timeSv = await _unitOfWork.GetDateTime();
            var idUser = _abpSession.UserId;
            _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                       .Insert(new Shared.Entitys.AttributeEntity
                       {
                           Name = input.Name,
                           Types = (int)input.Types,
                           CategoryProductId = input.CategoryProductId,
                           IsActive = input.IsActive,
                           IsDeleted = false,
                           LastModificationTime = timeSv,
                           LastModifierUserId = idUser
                       });
            _unitOfWork.SaveChanges();
            return 1;
        }

        [HttpPost]
        public async Task<int> Update(ProductAttributeUpdateDto input)
        {
            // kiểm tra category 
            var isCategory = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                              .ExistsAsync(p => p.Id != input.CategoryProductId);
            if (isCategory) throw new ClientException("Category", ERROR_DATA.DATA_NULL);
            // kiểm tra name && type
            var isNameProductAttributes = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                          .GetAllAsync(p => p.Id == input.Id
                                                                         && p.Name.ToUpper() == input.Name.ToUpper()
                                                                         && p.Types == (int)input.Types
                                                                         && p.CategoryProductId == input.CategoryProductId);
            if (isNameProductAttributes.Count != 1) throw new ClientException("ProductAttribute", ERROR_DATA.DATA_NULL);
            // update
            var isNameProductAttribute = isNameProductAttributes.FirstOrDefault();
            var timeSv = _unitOfWork.GetDateTime();
            var idUser = _abpSession.UserId;
            isNameProductAttribute.Name = input.Name;
            isNameProductAttribute.IsActive = input.IsActive;
            isNameProductAttribute.IsDeleted = false;
            _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                       .Update(isNameProductAttributes);
            _unitOfWork.SaveChanges();
            return 1;
        }

        [HttpDelete]
        public async Task<int> Remove(long id)
        {
            var productAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                    .GetFirstOrDefaultAsync(predicate: p => p.Id == id);

            if (productAttribute == null) throw new ClientException("productAttribute", ERROR_DATA.DATA_NULL);
            if (productAttribute.IsDeleted) throw new ClientException("productAttribute", ERROR_DATA.UNKNOWN);

            productAttribute.IsDeleted = true;
            _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().Update(productAttribute);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpGet]
        public async Task<List<ProductAttributeTypeAndCategoryRes>> LoadByTypesAndCategory(ProductAttributeTypeAndCategoryReq input)
        {
            var rsl = new List<ProductAttributeTypeAndCategoryRes>();

            if (input == null) throw new ClientException("Input", ERROR_DATA.DATA_NULL);

            var productAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                    .GetAllAsync(p => p.Types == (int)input.TypesAttribute
                                                                 && input.CategoryIds.Contains(p.CategoryProductId)
                                                                 && p.IsActive == true
                                                                 && (string.IsNullOrEmpty(input.Name) || p.Name.ToUpper().Contains(input.Name.ToUpper())));
            rsl = productAttribute.Select(s => new ProductAttributeTypeAndCategoryRes
            {
                Id = s.Id,
                Name = s.Name
            }).ToList();

            return rsl;
        }
    }
}
