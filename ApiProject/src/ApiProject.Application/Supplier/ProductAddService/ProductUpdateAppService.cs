using Abp.Application.Services;
using Abp.Runtime.Session;
using ApiProject.Authorization;
using ApiProject.Shared.DataTransfer.Product;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.Supplier.ProductAddService
{
    public interface IProductUpdateAppService : IApplicationService
    {
        Task<ProductAddInsertsDto> GetProductById(long idsp);
    }

    public class ProductUpdateAppService : IProductUpdateAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplierSession;

        public ProductUpdateAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplierSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
            _supplierSession = supplierSession;
        }

        [HttpGet]
        public async Task<ProductAddInsertsDto> GetProductById(long idsp)
        {
            var rsl = new ProductAddInsertsDto();
            // get category product
            rsl.Categorys = (await _unitOfWork.GetRepository<Shared.Entitys.ProductCategoryMappingEntity>()
                                              .GetAllAsync(g => g.ProductId == idsp))
                             .Select(s => s.CategoryId).ToList();
            // get detail product
            var product = await _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>()
                                           .GetFirstOrDefaultAsync(predicate: g => g.Id == idsp);

            rsl.InfoBasic = new ProductAddQueryDto
            {
                Name = product.Name,
                Fragile = product.Fragile,
                OrderMaximumQuantity = product.OrderMaximumQuantity,
                OrderMinimumQuantity = product.OrderMinimumQuantity,
                ProductAlbum = product.ProductAlbum,
                Trademark = product.Trademark,
                UnitProduct = product.UnitProduct
            };
            // get Image 
            var imageMapping = _unitOfWork.GetRepository<Shared.Entitys.ProductImageMappingEntity>().GetAll().Where(w => w.ProductId == idsp);
            var filesource = _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().GetAll();

            rsl.Images = (from image in imageMapping
                          join file in filesource.Where(w => w.Size == "FULL") on image.ImageSourceId equals file.Id
                          select string.Format("Cxrovxxtvv/{0}", file.VirtualPath)).ToList();
            int index = 1;
            rsl.FutureProduct = (await _unitOfWork.GetRepository<Shared.Entitys.FeatureProductEntity>()
                                                  .GetAllAsync(w => w.ProductId == idsp)
                                ).Join(filesource,
                                       o => o.PictureId,
                                       i => i.Id,
                                       (s, i) => new DataTypeProductAdd
                                       {
                                           Id = s.Id,
                                           Key = index++.ToString(),
                                           Name = s.Name,
                                           IdKeyAttributeOne = s.AttributeIdOne,
                                           IdKeyAttributeTwo = s.AttributeIdTwo,
                                           IdKeyAttributeThree = s.AttributeIdThree,
                                           KeyAttributeOne = s.AttributeValueOne,
                                           KeyAttributeTwo = (long)s.AttributeValueTwo,
                                           KeyAttributeThree = (long)s.AttributeValueThree,
                                           Price = s.Price.ToString(),
                                           Quantity = s.Quantity,
                                           DisplayOrder = s.DisplayOrder,
                                           Avatar = string.Format("{0}/{1}", i.Folder, i.VirtualPath)
                                       })
                                .ToList();

            return rsl;
        }
    }
}
