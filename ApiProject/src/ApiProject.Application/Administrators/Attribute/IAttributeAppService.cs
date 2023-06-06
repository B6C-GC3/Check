using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.ProductAttribute;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Administrators.Attribute
{
    public interface IAttributeAppService : IApplicationService
    {
        Task<IPagedList<ProductAttributeDto>> GetPageList(SearchRequest input);
        Task<ProductAttributeDetailDto> GetDetail(long id);
        Task<int> Insert(ProductAttributeInsertDto input);
        Task<int> Update(ProductAttributeUpdateDto input);
        Task<int> Remove(long id);
        Task<int> ChangeActive(long id);
        Task<int> ChangeType(ProductAttributeChangeTypesDto input);
        Task<int> ChangeCategory(ProductAttributeChangeCategoryDto input);
        Task<List<ProductAttributeTypeAndCategoryRes>> LoadByTypesAndCategory(ProductAttributeTypeAndCategoryReq input);
    }
}
