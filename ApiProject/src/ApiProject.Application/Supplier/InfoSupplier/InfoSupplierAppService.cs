using Abp.Runtime.Session;
using ApiProject.Authorization;
using ApiProject.MappingExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.DataTransfer.Supplier;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Exceptions;

namespace ApiProject.Supplier.InfoSupplier
{
    public class InfoSupplierAppService : IInfoSupplierAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplier;

        public InfoSupplierAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplier)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
            _supplier = supplier;
        }

        [HttpGet]
        public Task<SupplierInfoDto> GetDetailSupplier()
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public async Task<SupplierInfoDto> GetSingleSupplier()
        {
            var idSupplier = _supplier.SupplierId;
            var idUser = _abpSession.UserId;

            var supplier = await _unitOfWork.GetRepository<Shared.Entitys.SupplierEntity>()
                                            .GetFirstOrDefaultAsync(predicate: p => p.Id == idSupplier && p.CreatorUserId == idUser)
                           ?? throw new ClientException("ID", ERROR_DATA.DATA_NULL);

            var rsl = MappingData.InitializeAutomapper().Map<SupplierInfoDto>(supplier);

            return rsl;
        }

        [HttpPut]
        public Task<int> UpdateHierarchical(SupplierHierarchicalDto input)
        {
            throw new NotImplementedException();
        }
    }
}
