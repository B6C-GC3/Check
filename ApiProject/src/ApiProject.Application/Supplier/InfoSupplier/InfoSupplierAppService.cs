using Abp.Localization;
using Abp.Runtime.Session;
using ApiProject.MappingExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Supplier;
using ApiProject.Shared.Entitys;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Supplier.InfoSupplier
{
    public class InfoSupplierAppService : IInfoSupplierAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public InfoSupplierAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpGet]
        public Task<SupplierInfoDto> GetDetailSupplier()
        {
            throw new NotImplementedException();
        }

        
        [HttpGet]
        public async Task<SupplierInfoDto> GetSingleSupplier()
        {
            var idSupplier = _abpSession.UserId;

            if (idSupplier == null || idSupplier == 0) throw new ClientException("SUPPLIER", ERROR_DATA.DATA_NULL);

            var mappping = (await _unitOfWork.GetRepository<SupplierMappingEntity>()
                                             .GetAllAsync(g => g.UserAccountId == idSupplier && g.IsActive == true))
                                             .ToList();

            if (mappping.Count != 1) throw new ClientException("SUPPLIER_MAPPING", ERROR_DATA.DATA_NULL);

            var lag = (await _unitOfWork.GetRepository<ApplicationLanguage>().GetAllAsync()).ToList();
            var data = await _unitOfWork.GetRepository<SupplierEntity>()
                                        .GetFirstOrDefaultAsync(predicate: s => s.Id == mappping.FirstOrDefault().SupplierId);

            var res = MappingData.InitializeAutomapper().Map<SupplierInfoDto>(data);
            res.DefaultLanguageName = lag.FirstOrDefault(w => w.Id == res.DefaultLanguageId)?.DisplayName;

            return res;
        }

        [HttpPut]
        public Task<int> UpdateHierarchical(SupplierHierarchicalDto input)
        {
            throw new NotImplementedException();
        }
    }
}
