using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Supplier;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Supplier.InfoSupplier
{
    public interface IInfoSupplierAppService : IApplicationService
    {
        Task<int> UpdateHierarchical(SupplierHierarchicalDto input);
        Task<SupplierInfoDto> GetSingleSupplier();
        Task<SupplierInfoDto> GetDetailSupplier();
    }
}
