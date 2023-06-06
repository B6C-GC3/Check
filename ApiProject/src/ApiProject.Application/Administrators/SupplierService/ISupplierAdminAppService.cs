using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Supplier;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Administrators.SupplierService
{
    public interface ISupplierAdminAppService : IApplicationService
    {
        Task<IPagedList<SupplierInfoDto>> GetPagelist(SearchRequest input);
        Task<int> ChangeStatus(SupplierChangeStatus input);
    }
}
