using Abp.Runtime.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.Supplier.ProductAttributeMappingService
{
    public class ProductAttributeMappingAppService : IProductAttributeMappingAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public ProductAttributeMappingAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

    }
}
