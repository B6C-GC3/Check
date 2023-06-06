using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.ProductAttribute;
using ApiProject.Shared.DataTransfer.SupplierFollow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Administrators.SupplierFollowAdminService
{
    public interface ISupplierFollowAdminAppService : IApplicationService
    {
        Task<IPagedList<SupplierFollowDto>> GetPageList(SearchRequest input);
        Task<SupplierFollowDetailDto> GetDetail(long id);
        Task<int> Insert(SupplierFollowInsertDto input);
        Task<int> Update(SupplierFollowUpdateDto input);
        Task<int> Remove(long id);
    }
}
