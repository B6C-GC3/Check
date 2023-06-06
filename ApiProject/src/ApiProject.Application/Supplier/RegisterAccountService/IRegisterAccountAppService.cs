using Abp.Application.Services;
using ApiProject.Shared.DataTransfer.Supplier;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Supplier.RegisterAccountService
{
    public interface IRegisterSupplierAccountAppService : IApplicationService
    {
        Task<SupplierRegisterDto> GetInfoSupplier();
        Task<int> RegisterOrUpdateSupplierService(SupplierRegisterDto input);
    }
}
