using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.ProductAttributeValue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Administrators.ProductAttributeValueService
{
    public interface IProductAttributeValueAppService : IApplicationService
    {
        Task<IPagedList<SelectedModel>> GetTrademarkByCategorys(SearchRequest input);
        Task<IPagedList<SelectedModel>> GetUnitByCategorys(SearchRequest input);
        Task<List<SelectedModel>> GetAllAttribute(List<long> IdCategorys);
        Task<IPagedList<SelectedModel>> GetAllAttributeValue(SearchRequest input);
        Task<int> InsertProductAttributeValueBySupplier(ProductAttributeValueAddBySuppllier input);
    }
}
