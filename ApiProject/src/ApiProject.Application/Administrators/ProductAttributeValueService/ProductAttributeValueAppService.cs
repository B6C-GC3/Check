using Abp.Runtime.Session;
using ApiProject.Authorization;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.ProductAttributeValue;
using ApiProject.Shared.Entitys;
using ApiProject.UL;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Administrators.ProductAttributeValueService
{
    public class ProductAttributeValueAppService : IProductAttributeValueAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplierGlobal;
        private const long SUPPLIER_ID = 3;

        public ProductAttributeValueAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplierGlobal)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
            _supplierGlobal = supplierGlobal;
        }

        [HttpGet]
        public async Task<List<SelectedModel>> GetAllAttribute(List<long> IdCategorys)
        {
            var rsl = new List<SelectedModel>();
            rsl = (await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                    .GetAllAsync(p => p.Types == (int)AttributeUL.ATTRIBUTE
                                                   && IdCategorys.Contains(p.CategoryProductId)))
                  .Select(s => new SelectedModel { Id = s.Id, Value = s.Name }).DistinctBy(d => d.Value)
                  .ToList();
            return rsl;
        }

        [HttpGet]
        public async Task<IPagedList<SelectedModel>> GetAllAttributeValue(SearchRequest input)
        {
            var idAttribute = int.Parse(input.ValuesSearch[0]);
            var valueSearch = input.ValuesSearch[1];

            var data = string.IsNullOrEmpty(valueSearch) ?
                (await _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                  .GetPagedListAsync(predicate: p => p.IsActive == true
                                                                  && p.AttributeId == idAttribute))
                : (await _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                    .GetPagedListAsync(predicate: p => p.IsActive == true
                                                                    && p.AttributeId == idAttribute
                                                                    && p.Values.ToUpper().Contains(valueSearch.ToUpper())));

            return data.Items.ToList().Select(s => new SelectedModel { Id = s.Id, Value = s.Values })
                             .ToPagedList(pageIndex: data.PageIndex,
                                           pageSize: data.PageSize);
        }

        [HttpGet]
        public async Task<IPagedList<SelectedModel>> GetTrademarkByCategorys(SearchRequest input)
        {
            if (input == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[0] == null)
                throw new ClientException("input", ERROR_DATA.DATA_NULL);

            var lstIdCategory = JsonConvert.DeserializeObject<List<long>>(input.ValuesSearch[0]);
            var valueSearch = input.ValuesSearch[1];

            var attributeEntitys = _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().GetAll();
            var productAttributeValueEntitys = _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>().GetAll();

            var rls = await attributeEntitys.Where(m => lstIdCategory.Contains(m.CategoryProductId) && m.IsActive == true && m.Types == (int)AttributeUL.TRADEMARK)
                                            .Join(inner: productAttributeValueEntitys.Where(w => w.IsActive == true
                                                                                              && (w.SupplierId == null || w.SupplierId == SUPPLIER_ID)
                                                                                              && (string.IsNullOrEmpty(valueSearch) || w.Values.Contains(valueSearch))),
                                                  outerKeySelector: m => m.Id,
                                                  innerKeySelector: n => n.AttributeId,
                                                  resultSelector: (m, n) => new SelectedModel { Id = n.Id, Value = n.Values })
                                            .ToPagedListAsync(pageIndex: input.PageIndex, pageSize: input.PageSize);

            return rls;
        }

        [HttpGet]
        public async Task<IPagedList<SelectedModel>> GetUnitByCategorys(SearchRequest input)
        {
            if (input == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[0] == null)
                throw new ClientException("input", ERROR_DATA.DATA_NULL);

            var lstIdCategory = JsonConvert.DeserializeObject<List<long>>(input.ValuesSearch[0]);
            var valueSearch = input.ValuesSearch[1];

            var attributeEntitys = _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().GetAll();
            var productAttributeValueEntitys = _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>().GetAll();

            var rls = await attributeEntitys.Where(m => lstIdCategory.Contains(m.CategoryProductId) && m.IsActive == true && m.Types == (int)AttributeUL.UNIT)
                                            .Join(inner: productAttributeValueEntitys.Where(w => w.IsActive == true
                                                                                              && (w.SupplierId == null || w.SupplierId == SUPPLIER_ID)
                                                                                              && (string.IsNullOrEmpty(valueSearch) || w.Values.Contains(valueSearch))),
                                                  outerKeySelector: m => m.Id,
                                                  innerKeySelector: n => n.AttributeId,
                                                  resultSelector: (m, n) => new SelectedModel { Id = n.Id, Value = n.Values })
                                            .ToPagedListAsync(pageIndex: input.PageIndex, pageSize: input.PageSize);

            return rls;
        }

        [HttpPost]
        public async Task<int> InsertProductAttributeValueBySupplier([FromBody] ProductAttributeValueAddBySuppllier input)
        {
            if (input is null) throw new ClientException("input", ERROR_DATA.DATA_NULL);

            // check db with attribute id
            var isAttributeEx = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                                 .ExistsAsync(p => p.Id == input.IdAttribute);
            if (!isAttributeEx) throw new ClientException("ATTRIBUTE_ID", ERROR_DATA.CHECK_FAIL);

            // check Value db with value attribute
            var isValueAttributeEx = await _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                                      .ExistsAsync(p => p.AttributeId == input.IdAttribute
                                                                     && (p.SupplierId == null || p.SupplierId == SUPPLIER_ID)
                                                                     && p.Values.ToUpper() == input.Value.ToUpper());
            if (isValueAttributeEx) throw new ClientException("ATTRIBUTE_VALUE", ERROR_DATA.CHECK_FAIL);

            // insert 
            _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                       .Insert(new ProductAttributeValueEntity
                       {
                           AttributeId = input.IdAttribute,
                           Values = input.Value,
                           SupplierId = SUPPLIER_ID,
                           IsActive = true,
                           CreatorUserId = SUPPLIER_ID,
                           LastModifierUserId = SUPPLIER_ID
                       });
            _unitOfWork.SaveChanges();
            return 1;
        }
    }
}
