using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.StaffSupplier;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Supplier.StaffSupplier
{
    public interface IStaffSupplierAppService : IApplicationService
    {
        Task<IPagedList<StaffSupplierDto>> GetStaffPageList(SearchRequest input);
        Task<int> RemoveStaff(long id);
        Task<int> UpdateBoss(long id);
    }
}
