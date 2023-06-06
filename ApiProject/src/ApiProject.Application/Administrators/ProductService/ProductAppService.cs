using Abp.Runtime.Session;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Exceptions;

namespace ApiProject.Administrators.ProductService
{
    public class ProductAppService : IProductAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private const long SUPPLIER_ID = 3;

        public ProductAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        public async Task<List<Values>> GetAlbumProductByIdSupplier()
        {
            if (SUPPLIER_ID == 0) throw new ClientException("input", ERROR_DATA.DATA_NULL);
            var data = _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>()
                                   .GetAll();

            var rsl = await (data.Where(m => m.SupplierId == SUPPLIER_ID && m.IsActive == true)
                                 .Select(m => new Values { Label = m.Name, Value = m.Name })
                                 .DistinctBy(m => m.Value))
                            .ToListAsync();
            return rsl;
        }
    }
}
