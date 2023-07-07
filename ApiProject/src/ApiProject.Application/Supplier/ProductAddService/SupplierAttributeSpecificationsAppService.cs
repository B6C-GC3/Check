using Abp.Application.Services;
using Abp.Runtime.Session;
using ApiProject.Authorization;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.UL;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NPOI.HPSF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Supplier.ProductAddService
{
    public interface ISupplierAttributeSpecifications : IApplicationService
    {
        Task<IPagedList<SelectedModel>> GetAttributeSpecifications(SearchRequest input);
    }

    public class SupplierAttributeSpecificationsAppService : ISupplierAttributeSpecifications
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplierSession;

        public SupplierAttributeSpecificationsAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplierSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
            _supplierSession = supplierSession;
        }

        [HttpGet]
        public async Task<IPagedList<SelectedModel>> GetAttributeSpecifications(SearchRequest input)
        {
            if (input == null) throw new ClientException("INPUT", ERROR_DATA.DATA_NULL);

            List<SelectedModel> dataRsl = new();
            var categoryIds = JsonConvert.DeserializeObject<List<long>>(input.ValuesSearch[0]);
            if (categoryIds == null || categoryIds.Count == 0)
                return dataRsl.MapToPagedList(pageIndex: input.PageIndex, pageSize: input.PageSize, totalCount: 0, indexFrom: 0);

            var data = await _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                        .GetPagedListAsync(predicate: p => categoryIds.Contains(p.CategoryProductId)
                                                                        && p.Types == (int)AttributeUL.SPECIFICATIONS
                                                                        && p.IsActive == true
                                                                        && (p.SupplierId == null || p.SupplierId == _supplierSession.Id),
                                                           pageIndex: input.PageIndex,
                                                            pageSize: input.PageSize);
                       
            dataRsl = data.Items.Select(s => new SelectedModel
            {
                Id = s.Id,
                Value = s.Name
            }).ToList();

            return dataRsl.MapToPagedList(pageIndex: data.PageIndex, pageSize: data.PageSize, totalCount: data.TotalCount, indexFrom: data.IndexFrom);
        }
    }
}
