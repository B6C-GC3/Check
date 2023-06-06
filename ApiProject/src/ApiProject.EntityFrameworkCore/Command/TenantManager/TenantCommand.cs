using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Any;

namespace ApiProject.Command.TenantManager
{
    public class TenantCommand
    {
        public async Task<bool> CheckTenantExist(IUnitOfWork _unitOfWork, string name)
        {
            return await _unitOfWork.GetRepository<ApiProject.MultiTenancy.Tenant>()
                         .ExistsAsync(m => m.Name == name && m.TenancyName == name.FromViToConst());
        }

        public async Task<bool> CheckTenantIdExist(IUnitOfWork _unitOfWork, int id)
        {
            return await _unitOfWork.GetRepository<ApiProject.MultiTenancy.Tenant>()
                                    .ExistsAsync(m => m.Id == id);
        }

        /// <summary>
        /// Check tên mới khác Id hiện tại có tồn tại không
        /// </summary>
        public async Task<bool> CheckTenantNameNewExist(IUnitOfWork _unitOfWork, int id, string name)
        {
            return await _unitOfWork.GetRepository<ApiProject.MultiTenancy.Tenant>()
                                    .ExistsAsync(m => m.Name == name && m.TenancyName == name.FromViToConst() && m.Id != id);
        }
    }
}
