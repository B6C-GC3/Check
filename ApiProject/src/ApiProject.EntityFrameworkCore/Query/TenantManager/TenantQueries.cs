using ApiProject.MultiTenancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.Query.TenantManager
{
    public class TenantQueries
    {
        public async Task Update(IUnitOfWork unitOfWork, Tenant tenant)
        {
            unitOfWork.GetRepository<Tenant>().Update(tenant);
        }
    }
}
