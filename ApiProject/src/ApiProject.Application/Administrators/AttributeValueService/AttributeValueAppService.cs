using Abp.Runtime.Session;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.ProductAttribute;
using ApiProject.Shared.DataTransfer.ProductAttributeValue;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Administrators.AttributeValueService
{
    public class AttributeValueAppService : IAttributeValueAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private const long SUPPLIER_ID = 3;
        public AttributeValueAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpPost]
        public async Task<int> AdminInsert(ProductAttributeValueAdminInsertDto input)
        {
            // kiem tra id
            var isAttributeId = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                 .ExistsAsync(p => p.Id == input.AttributeId && p.IsActive == true);
            if (!isAttributeId) throw new ClientException("ProductAttribute", ERROR_DATA.DATA_NOT_EXIST);

            // id and name
            var isAttributeValue = await _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                                    .ExistsAsync(p => p.Id == input.AttributeId
                                                                   && p.Values.ToUpper() == input.Values
                                                                   && p.SupplierId == null);
            if (isAttributeValue) throw new ClientException("ProductAttributeValue", ERROR_DATA.DATA_EXIST);

            _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                       .Insert(new Shared.Entitys.ProductAttributeValueEntity
                       {
                           AttributeId = input.AttributeId,
                           Values = input.Values,
                           SupplierId = null,
                           LastModifierUserId = _abpSession.UserId,
                           IsActive = true,
                           IsDeleted = false
                       });
            _unitOfWork.SaveChanges();
            return 1;
        }

        [HttpGet]
        public async Task<IPagedList<ProductAttributeValueAdminDto>> GetPagedList(SearchRequest input)
        {
            var data = await _unitOfWork.FromSqlPageListAsync<ProductAttributeValueAdminDto>(
                sql: $@"
                      SELECT cp.Id AS ""Id""
                      	    ,cp.[Values] AS ""Values""
                      	    ,cp.AttributeId AS ""AttributeId""
                      	    ,a.Name  AS ""AttributeName""
                      	    ,a.CategoryProductId  AS ""CategoryProductId""
                      	    ,ca.Name AS ""CategoryProductName""
                      	    ,cp.SupplierId AS ""SupplierId""
                      	    ,s.NameShop  AS ""SupplierName""
                      	    ,cp.IsActive AS ""IsActive"" 
                      	    ,cp.LastModifierUserId AS ""LastModifierUserId""
                      	    ,ua.UserName AS ""LastModifierUserName""
                            ,cp.LastModificationTime AS ""LastModificationTime""
                      FROM  ProductAttributeValue cp
                      INNER JOIN [Attribute] a ON cp.AttributeId = a.Id
                      INNER JOIN [CategoryProduct] ca ON ca.Id = a.CategoryProductId
                      LEFT  JOIN [Supplier] s ON s.Id = cp.SupplierId
                      LEFT  JOIN [AbpUserAccounts] ua ON ua.Id = cp.LastModifierUserId
                      WHERE cp.IsDeleted = 0
                        {(input.ValuesSearch == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[0] == null
                        ? ""
                        : $" AND cp.[Values] LIKE '%{input.ValuesSearch[0].ToUpper()}%' ")}
                        ORDER BY {(string.IsNullOrEmpty(input.PropertyOrder)
                        ? "cp.[Values]"
                        : $"cp.{(input.PropertyOrder)} {(input.ValueOrderBy ? "ASC" : "DESC")}")}",
                orderBy: "cp.[Values]",
                pageIndex: input.PageIndex,
                pageSize: input.PageSize);
            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }

        [HttpPost]
        public async Task<int> Insert(ProductAttributeValueInsertDto input)
        {
            // kiem tra id
            var isAttributeId = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                 .ExistsAsync(p => p.Id == input.AttributeId && p.IsActive == true);
            if (!isAttributeId) throw new ClientException("ProductAttribute", ERROR_DATA.DATA_NOT_EXIST);

            // check supplier id
            var isSupplierId = await _unitOfWork.GetRepository<Shared.Entitys.SupplierEntity>()
                                                .ExistsAsync(p => p.Id == SUPPLIER_ID);
            if (!isAttributeId) throw new ClientException("Supplier", ERROR_DATA.DATA_NOT_EXIST);

            // id and name
            var isAttributeValue = await _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                                    .ExistsAsync(p => p.Id == input.AttributeId
                                                                   && p.Values.ToUpper() == input.Values
                                                                   && p.SupplierId == SUPPLIER_ID);
            if (isAttributeValue) throw new ClientException("ProductAttributeValue", ERROR_DATA.DATA_EXIST);

            _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                       .Insert(new Shared.Entitys.ProductAttributeValueEntity
                       {
                           AttributeId = input.AttributeId,
                           Values = input.Values,
                           SupplierId = SUPPLIER_ID,
                           LastModifierUserId = _abpSession.UserId,
                           IsActive = true,
                           IsDeleted = false
                       });
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpGet]
        public async Task<IPagedList<LoadValueByProductAttributeIdIdRes>> LoadProductAttributeById(SearchRequest input)
        {
            /*  input define 
             *  input.ValuesSearch[0] : attributeProductId : not null
             *  input.ValuesSearch[1] : values             : null
             *  input.PageSize        : 10                 : not null 
             *  input.PageIndex       : 1                  : not null
             * */

            // check input
            if (input.ValuesSearch.Length != 2) throw new ClientException("input", ERROR_DATA.DATA_BASIC_FAIL);

            var isAttributeProductId = long.TryParse(input.ValuesSearch[0], out long attributeProductId);
            if (!isAttributeProductId) throw new ClientException("Attribute", ERROR_DATA.CHECK_FAIL);

            // kiểm tra id Attribute
            var isAttribute = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                      .ExistsAsync(p => p.Id == attributeProductId
                                                                     && p.IsActive == true);
            if (!isAttribute) throw new ClientException("Attribute", ERROR_DATA.DATA_NULL);

            if (string.IsNullOrEmpty(input.ValuesSearch[1]))
            {
                var data = await _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                            .GetPagedListAsync(pageIndex: input.PageIndex,
                                                                pageSize: input.PageSize,
                                                               predicate: p => p.AttributeId == attributeProductId
                                                                            && p.IsActive == true
                                                                            && (p.SupplierId == SUPPLIER_ID || p.SupplierId == null));

                return data.Items.Select(s => new LoadValueByProductAttributeIdIdRes { Id = s.Id, Values = s.Values })
                                 .MapToPagedList(data.IndexFrom, data.PageSize, data.TotalCount, 1);
            }
            else
            {
                var data = await _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                            .GetPagedListAsync(pageIndex: input.PageIndex,
                                                                pageSize: input.PageSize,
                                                               predicate: p => p.AttributeId == attributeProductId
                                                                            && p.IsActive == true
                                                                            && p.Values.ToUpper().Contains(input.ValuesSearch[1].ToUpper())
                                                                            && (p.SupplierId == SUPPLIER_ID || p.SupplierId == null));

                return data.Items.Select(s => new LoadValueByProductAttributeIdIdRes { Id = s.Id, Values = s.Values })
                                 .MapToPagedList(data.IndexFrom, data.PageSize, data.TotalCount, 1);
            }
        }
    }
}
