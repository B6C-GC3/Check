using Abp.Domain.Entities;
using Abp.Runtime.Session;
using ApiProject.Command.CategoryManage;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.CategoryProduct;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Any;
using Utils.Exceptions;

namespace ApiProject.Administrators.CategoryProduct
{
    public class CategoryProductAppService : ICategoryProductAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private const int SUCCESSFUL = 1;
        public CategoryProductAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession; 
        }

        [HttpPost]
        public async Task<int> ChangePlacesCategory(CategoryChangeNumberOrder input)
        {
            if (input.IdDestination == input.IdRoot)
                throw new ClientException("Id", ERROR_DATA.CHECK_FAIL);
            // lấy dữ liệu theo id
            var categoryRoot = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                                .GetFirstOrDefaultAsync(predicate: m => m.Id == input.IdRoot);
            var categoryDestination = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                                       .GetFirstOrDefaultAsync(predicate: m => m.Id == input.IdDestination);
            // kiểm tra dữ liệu
            if (categoryRoot == null || categoryDestination == null)
                throw new ClientException("Category", ERROR_DATA.DATA_NULL);

            if (!categoryRoot.IsActive || !categoryDestination.IsActive)
                throw new ClientException("IsActive", ERROR_DATA.CHECK_FAIL);

            if (categoryRoot.TenantId != categoryDestination.TenantId)
                throw new ClientException("TenantId", ERROR_DATA.CHECK_FAIL);

            if (categoryRoot.CategoryMain != categoryDestination.CategoryMain)
                throw new ClientException("CategoryMain", ERROR_DATA.CHECK_FAIL);
            // sử lý dữ liệu
            (categoryDestination.NumberOrder, categoryRoot.NumberOrder) = (categoryRoot.NumberOrder, categoryDestination.NumberOrder);

            _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                       .Update(new List<Shared.Entitys.CategoryProductEntity>() {
                                   categoryDestination,
                                   categoryRoot
                                  });
            _unitOfWork.SaveChanges();
            // thông báo
            return SUCCESSFUL;
        }

        [HttpPost]
        public async Task<int> CreateCategoryForAdmin([FromBody]AdminCategoryCreateDto input)
        {
            var tenantId = _abpSession.TenantId;
            var userId = _abpSession.UserId;

            var repoTbe = _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>();

            var url = string.IsNullOrEmpty(input.Url) ? input.Name.FromViToConst().ToLower() : input.Url;
            if (!url.StartsWith("/")) url = "/" + url;

            // check db
            if (await repoTbe.ExistsAsync(m => (m.Name == input.Name || m.Url == url) && m.CategoryMain == input.CategoryMain))
                throw new ClientException("Category", ERROR_DATA.DATA_EXIST);


            if (input.Level == 0 && input.CategoryMain != 0)
                throw new ClientException("CategoryMain", ERROR_DATA.SERVER_CHECK_FAIL);

            // max order 
            var numberOrder = await repoTbe.MaxAsync(predicate: m => m.CategoryMain == input.CategoryMain
                                                                  && m.Level == input.Level,
                                                      selector: s => s.NumberOrder);
            // insert to db
            var data = new Shared.Entitys.CategoryProductEntity
            {
                Name = input.Name,
                CategoryMain = input.CategoryMain,
                IsActive = input.IsActive,
                Level = input.Level,
                TenantId = input.TenantId,
                NumberOrder = numberOrder + 1,
                Icon = input.Icon,
                Url = url,
                CreatorUserId = userId,
                LastModifierUserId = userId
            };

            repoTbe.Insert(data);
            _unitOfWork.SaveChanges();
            return 1;
        }

        [HttpGet]
        public async Task<List<CategoryMainDto>> GetCategoryMain(int level, string nameSearch)
        {
            if (level < 0) throw new ClientException("Category", ERROR_DATA.CHECK_FAIL);

            if (nameSearch == null)
            {
                return (await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                         .GetPagedListAsync(predicate: m => m.Level == level, pageIndex: 0, pageSize: 20)).Items.Select(m => new CategoryMainDto
                                         {
                                             Id = m.Id,
                                             Name = m.Name
                                         }).ToList();
            }
            else
            {
                // kiểm tra tên
                if (!nameSearch.ToRegexIsMatch(RegexProcess.NAME_VN)) throw new ClientException("Category", ERROR_DATA.CHECK_FAIL);

                return (await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                         .GetPagedListAsync(predicate: m => m.Level == level
                                                                         && m.Name.ToUpper().Contains(nameSearch.ToUpper()),
                                                            pageIndex: 0,
                                                            pageSize: 20)).Items.Select(m => new CategoryMainDto
                                                            {
                                                                Id = m.Id,
                                                                Name = m.Name
                                                            }).ToList();
            }
        }

        public async Task<IPagedList<CategoryTableDto>> GetData(SearchRequest input)
        {
            var data = await _unitOfWork.GetDataCmd(input);
            return data;
        }

        [HttpPut]
        public async Task<int> LockCategory(IdentityKey<long> input)
        {
            if (input.Id == 0) throw new ClientException("Id", ERROR_DATA.DATA_NULL);
            // load db
            var data = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                        .GetFirstOrDefaultAsync(predicate: m => m.Id == input.Id);
            // check
            if (data == null) throw new ClientException("Category", ERROR_DATA.DATA_NOT_EXIST);
            // process
            data.IsActive = !data.IsActive;
            _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                       .Update(data);
            _unitOfWork.SaveChanges();
            // return
            return SUCCESSFUL;
        }

        [HttpDelete]
        public Task<int> RemoveCategory(List<IdentityKey<long>> inputs)
        {
            throw new NotImplementedException();
        }
    }
}
