using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.CategoryProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Utils.Any.PrimitiveTypes;

namespace ApiProject.Supplier.SupplierCategoryService
{
    public interface ISupplierCategoryAppService : IApplicationService
    {
        Task<List<TreeItem<SupplierCategorAddProductDto>>> LoadTreeCategoryForAddProduct(SearchRequest input);
        Task<List<SupplierCategorAddProductDto>> LoadCategoryForAddProduct(SearchRequest input);
    }
}
