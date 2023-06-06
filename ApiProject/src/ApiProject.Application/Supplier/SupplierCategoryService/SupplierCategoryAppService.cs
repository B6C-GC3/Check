using Abp.Runtime.Session;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.CategoryProduct;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Exceptions;
using static Utils.Any.PrimitiveTypes;

namespace ApiProject.Supplier.SupplierCategoryService
{
    public class SupplierCategoryAppService : ISupplierCategoryAppService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        public SupplierCategoryAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpGet]
        public async Task<List<SupplierCategorAddProductDto>> LoadCategoryForAddProduct(SearchRequest input)
        {
            bool isIdCategoryMain = int.TryParse(input.ValuesSearch[0], out int idMainCategory);
            if (!isIdCategoryMain) throw new ClientException("input", ERROR_DATA.DATA_NULL);

            var supplierCategorAddProductDtos = new List<SupplierCategorAddProductDto>();

            var data = await _unitOfWork.GetRepository<Shared.Entitys.CategoryProductEntity>()
                                        .GetAllAsync(predicate: p => p.CategoryMain == idMainCategory && p.IsActive == true && p.TenantId == _abpSession.TenantId,
                                                     orderBy: o => o.OrderBy(s => s.Name));

            supplierCategorAddProductDtos = (data.Select(p => new SupplierCategorAddProductDto { Id = p.Id, Name = p.Name }))
                                            .OrderBy(p => p.Name)
                                            .ToList();
            return supplierCategorAddProductDtos;
        }


        public Task<List<TreeItem<SupplierCategorAddProductDto>>> LoadTreeCategoryForAddProduct(SearchRequest input)
        {
            throw new NotImplementedException();
        }
    }
}
