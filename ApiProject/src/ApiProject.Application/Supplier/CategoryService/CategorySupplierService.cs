using Abp.Application.Services;
using Abp.Domain.Entities;
using Abp.Runtime.Session;
using ApiProject.Authorization;
using ApiProject.ObjectValues;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Exceptions;

namespace ApiProject.Supplier.CategoryService
{
    public interface ICategorySupplierAppService : IApplicationService
    {
        Task<int> InsertOrUpdateCategory(List<long> ids);
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

        [HttpPost]
        public async Task<int> InsertOrUpdateCategory([FromBody] List<long> ids)
        {
            var _unitReposCateMap = _unitOfWork.GetRepository<Shared.Entitys.SupplierCategoryMappingEntity>();
            var countCategory = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>().CountAsync(c => ids.Contains(c.Id));
            if (ids.Count != countCategory) throw new ClientException("INPUT", ERROR_DATA.CHECK_FAIL);

            var dataCategorySupplier = (await _unitReposCateMap.GetAllAsync(a => a.SupplierId == _supplier.SupplierId)).ToList();
            var cateInsert = new List<Shared.Entitys.SupplierCategoryMappingEntity>();
            var cateUpdate = dataCategorySupplier;
            int change = 0;
            // Remove
            foreach (var entity in dataCategorySupplier)
                if (ids.Any(i => i != entity.CategoryId))
                {
                    change++;
                    cateUpdate.Remove(entity);
                }

            foreach (var id in ids)
                if (dataCategorySupplier.Any(i => i.CategoryId != id))
                {
                    change++;
                    cateInsert.Add(new Shared.Entitys.SupplierCategoryMappingEntity
                    {
                        CategoryId = id,
                        SupplierId = (long)_supplier.SupplierId,
                        CreatorUserId = _abpSession.UserId,
                        LastModifierUserId = _abpSession.UserId,
                        IsActive = true,
                        IsDeleted = false
                    });
                }

            _unitReposCateMap.Insert(cateInsert);
            _unitReposCateMap.Update(cateUpdate);

            _unitOfWork.SaveChanges();
            return change;
        }
    }
}
