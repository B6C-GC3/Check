using Abp.Application.Services;
using Abp.Runtime.Session;
using ApiProject.Authorization;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Supplier.CategoryService
{
    public interface ICategoryRootAppService : IApplicationService
    {
        Task<IPagedList<SelectedModel>> GetCategoryRoot(SearchRequest input);
    }

    public class CategoryRootAppService : ICategoryRootAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplier;

        public CategoryRootAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplier)
        {
            _abpSession = abpSession;
            _supplier = supplier;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IPagedList<SelectedModel>> GetCategoryRoot(SearchRequest input)
        {
            if (input == null) throw new ClientException("INPUT", ERROR_DATA.DATA_NULL);

            _ = long.TryParse(input.ValuesSearch[0], out long idCategoryMain);
            _ = int.TryParse(input.ValuesSearch[1], out int level);

            var rsl = new List<SelectedModel>();
            var data = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                        .GetPagedListAsync(predicate: p => p.IsActive == true
                                                                        && p.Level == level
                                                                        && p.CategoryMain == idCategoryMain,
                                                           pageIndex: input.PageIndex,
                                                           pageSize: input.PageSize);
            rsl = data.Items.Select(s => new SelectedModel { Id = s.Id, Value = s.Name })
                            .ToList();
            return rsl.MapToPagedList(pageIndex: data.PageIndex, pageSize: data.PageSize, totalCount: data.TotalCount, 0);
        }
    }
}
