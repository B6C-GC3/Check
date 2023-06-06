using Abp.Application.Services;
using ApiProject.MultiTenancy.Dto;
using ApiProject.Shared.Common;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.MultiTenancy.MyTenant
{
    public interface IMyTenantAppService : IApplicationService
    {
        Task<IPagedList<TenantBasicDto>> GetAll(SearchRequest input);
        Task<int> CreateTenant(TenantInsertDto tenantInput);
        Task<int> UpdateTenant(TenantUpdateDto tenantInput);
    }
}
