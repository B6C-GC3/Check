using ApiProject.Aggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.EntityFrameworkCore.Seed.Uow
{
    public class UowManager
    {
        protected readonly IUnitOfWork _unitOfWork;

        public UowManager()
        {
            _unitOfWork = (IUnitOfWork)StaticServiceProvider.Provider.GetService(typeof(IUnitOfWork));
        }

        public async Task<DateTime> GetDateSystem()
        {
            return await _unitOfWork.GetDateTime();
        }

        public int CreateBy()
        {
            return 0;
        }
    }
}
