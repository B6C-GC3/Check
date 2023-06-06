using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.CategoryProduct;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.Administrators.CategoryProduct
{
    public interface ICategoryProductAppService : IApplicationService
    {
        Task<List<CategoryMainDto>> GetCategoryMain(int level, string nameSearch);
        Task<int> ChangePlacesCategory(CategoryChangeNumberOrder input);
        Task<IPagedList<CategoryTableDto>> GetData(SearchRequest input);
        Task<int> CreateCategoryForAdmin(AdminCategoryCreateDto input);
        Task<int> LockCategory(IdentityKey<long> input);
        Task<int> RemoveCategory(List<IdentityKey<long>> inputs);
    }
}