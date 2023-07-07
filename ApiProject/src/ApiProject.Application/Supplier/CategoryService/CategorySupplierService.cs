using Abp.Application.Services;
using Abp.Domain.Entities;
using Abp.Runtime.Session;
using ApiProject.Authorization;
using ApiProject.Authorization.Users;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.CategoryProduct;
using DocumentFormat.OpenXml.Wordprocessing;
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
    public interface ICategorySupplierAppService : IApplicationService
    {
        Task<int> InsertOrUpdateCategory(List<long> ids);
        Task<IPagedList<CategorySupplierMappingDto>> GetDataPagedList(SearchRequest input);
    }

    public class CategorySupplierAppService : ICategorySupplierAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplier;

        public CategorySupplierAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplier)
        {
            _abpSession = abpSession;
            _supplier = supplier;
            _unitOfWork = unitOfWork;
        }

        public async Task<IPagedList<CategorySupplierMappingDto>> GetDataPagedList(SearchRequest input)
        {
            var categorySupplierMapping = _unitOfWork.GetRepository<Shared.Entitys.SupplierCategoryMappingEntity>().GetAll()
                                                     .Where(w => w.SupplierId == _supplier.Id);
            var category = _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>().GetAll();
            var user = _unitOfWork.GetRepository<User>().GetAll();

            var query = from cm in categorySupplierMapping
                        join c in category on cm.CategoryId equals c.Id
                        join u in user on cm.LastModifierUserId equals u.Id
                        join v in category on c.CategoryMain equals v.Id into left
                        from l in left.DefaultIfEmpty()
                        select (new CategorySupplierMappingDto
                        {
                            Id = c.Id,
                            CategoryMain = c.CategoryMain,
                            IsActived = cm.IsActive,
                            Name = c.Name,
                            UserEdit = u.Id,
                            UserName = u.Name,
                            CategoryMainName = l.Name,
                        });

            //========== SEARCH ==========
            if (input.ValuesSearch is not null)
            {
                var valueSearch = string.Format("{0}", input.ValuesSearch[0]?.ToLower());
                // Check single search
                if (input.PropertySearch != null && input.PropertySearch.Length != 0)
                {
                    var property = input.PropertySearch[0];
                    switch (property.ToUpper())
                    {
                        case "NAME":
                            query = query.Where(w => w.Name.Contains(valueSearch));
                            break;
                        case "CATEGORYMAINNAME":
                            query = query.Where(w => w.CategoryMainName.Contains(valueSearch));
                            break;
                        case "USERNAME":
                            query = query.Where(w => w.UserName.Contains(valueSearch));
                            break;
                        default: break;
                    }
                }
                // Check public search
                else
                {
                    if (input.ValuesSearch.Length != 0)
                    {
                        query = query.Where(w => w.CategoryMainName.Contains(valueSearch)
                                              || w.Name.Contains(valueSearch)
                                              || w.UserName.Contains(valueSearch)
                                           );
                    }
                }
            }

            //========== ORDER ==========

            //========== EXTRACT ==========
            var data = await query.ToPagedListAsync(pageIndex: input.PageIndex, pageSize: input.PageSize);

            return data;
        }

        [HttpPost]
        public async Task<int> InsertOrUpdateCategory([FromBody] List<long> ids)
        {
            var _unitReposCateMap = _unitOfWork.GetRepository<Shared.Entitys.SupplierCategoryMappingEntity>();
            var countCategory = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>().CountAsync(c => ids.Contains(c.Id));
            if (ids.Count != countCategory) throw new ClientException("INPUT", ERROR_DATA.CHECK_FAIL);

            var dataCategorySupplier = (await _unitReposCateMap.GetAllAsync(a => a.SupplierId == _supplier.Id)).ToList();
            var cateInsert = new List<Shared.Entitys.SupplierCategoryMappingEntity>();
            var cateUpdate = new List<Shared.Entitys.SupplierCategoryMappingEntity>();

            int change = 0;
            // Remove
            foreach (var entity in dataCategorySupplier)
                if (!ids.Exists(i => i == entity.CategoryId))
                {
                    change++;
                    cateUpdate.Add(entity);
                }

            foreach (var id in ids)
                if (!dataCategorySupplier.Exists(i => i.CategoryId == id))
                {
                    change++;
                    cateInsert.Add(new Shared.Entitys.SupplierCategoryMappingEntity
                    {
                        CategoryId = id,
                        SupplierId = (long)_supplier.Id,
                        CreatorUserId = _abpSession.UserId,
                        LastModifierUserId = _abpSession.UserId,
                        IsActive = true,
                        IsDeleted = false
                    });
                }

            if (ids.Count == 0)
            {
                foreach (var entity in dataCategorySupplier)
                {
                    change++;
                    cateUpdate.Add(entity);
                }
            }

            _unitReposCateMap.Insert(cateInsert);
            _unitOfWork.SaveChanges();
            _unitReposCateMap.Delete(cateUpdate);
            _unitOfWork.SaveChanges();
            return change;
        }
    }
}
