using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Roles.RoleInternal
{
    public interface IRoleInternalAppService : IApplicationService
    {
        Task<IPagedList<RoleInternalReadDto>> GetAllRole(SearchRequest input);
        Task<int> CreateRoleBasic(RoleInternalBasicDto input);
        Task<int> UpdateRoleBasic(RoleInternalBasicDto input);
    }
}
