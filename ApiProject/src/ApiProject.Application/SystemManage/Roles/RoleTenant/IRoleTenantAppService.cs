using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Role;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Roles.RoleTenant
{
    public interface IRoleTenantAppService : IApplicationService
    {
        Task<IPagedList<RoleTenantReadDto>> GetAllRoleByTenantId(SearchRequest input, int tenantId);
        Task<int> CreateRoleTenantBasic(RoleTenantBasicDto input);
        Task<int> UpdateRoleTenanatBasic(RoleTenantBasicDto input);
        Task<IPagedList<RopeTenantDictionaryDto>> LoadRoleSelectForUser(SearchRequest input);
    }
}
