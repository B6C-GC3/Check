using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.ProductAttributeValue;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Administrators.AttributeValueService
{
    public interface IAttributeValueAppService : IApplicationService
    {
        Task<int> AdminInsert(ProductAttributeValueAdminInsertDto input);
        Task<int> Insert(ProductAttributeValueInsertDto input);
        Task<IPagedList<ProductAttributeValueAdminDto>> GetPagedList(SearchRequest input);
        Task<IPagedList<LoadValueByProductAttributeIdIdRes>> LoadProductAttributeById(SearchRequest input);
    }
}
