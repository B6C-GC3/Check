using Abp.Application.Services;
using ApiProject.Shared.DataTransfer.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Supplier.ProductAddService
{
    public interface IProductAddSupplierAppService : IApplicationService
    {
        Task<int> InsertProduct(ProductAddInsertsDto input);
    }
}
