using Abp.Application.Services;
using ApiProject.Shared.DataTransfer.PermissionService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.PermissionService.PermissionTenant
{
    /// <summary> Cấp quyền cho tenant </summary>
    public interface IPermissionAppService : IApplicationService
    {
        Task<List<PermissionInternalTreeDto>> GetPermissionMaximum();
        Task<List<PermissionInternalTreeDto>> GetPermissionByTenant(int? idTenant);
        Task<List<string>> LoadPermissionTenantId(int? id);
        Task<int> UpdatePermissionForTenant(UpdatePermissionForTenantDto input);
        Task<int> UpdatePermissionForRoleTenant(UpdatePermissionForRoleTenantDto input);
        Task<List<string>> LoadPermissionMaximumByRoleTenantID(int? id, int? idRole);
        //List<PermissionInternalTreeDto> ProcessPermision(List<string> input);
        Task<List<PermissionInternalTreeDto>> LoadPermissionReview(int roleId, int tenantId);

    }
}
