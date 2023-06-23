using Abp.Application.Services;
using ApiProject.Shared.DataTransfer.Supplier;
using System.Threading.Tasks;

namespace ApiProject.Supplier.InfoSupplier
{
    public interface IInfoSupplierAppService : IApplicationService
    {
        Task<int> UpdateHierarchical(SupplierHierarchicalDto input);
        Task<SupplierInfoDto> GetSingleSupplier();
        Task<SupplierInfoDto> GetDetailSupplier();
    }
}
