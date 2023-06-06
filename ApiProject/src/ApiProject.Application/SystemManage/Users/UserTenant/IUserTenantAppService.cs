using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.SystemManage.Users.UserTenant
{
    public interface IUserTenantAppService : IApplicationService
    {
        Task<int> Create(UserTenantInsertUpdateDto input);
        // update
        // delete
        // active
        // deactive
        // get role
        // reset password
        // get
        // getall
        Task<IPagedList<UserTenantReviewDto>> GetAll(SearchRequest input);
    }
}
