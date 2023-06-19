using Abp.Application.Services;
using Abp.Runtime.Session;
using ApiProject.ObjectValues;
using ApiProject.Shared.DataTransfer.CartProduct;
using ApiProject.Shared.Entitys;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Exceptions;

namespace ApiProject.App.CartProductService
{
    public interface ICartProductAppService : IApplicationService
    {
        Task<int> AddToCart(CartProductReqDto input);
        Task<List<ReadCartProductResDto>> ReadCartForUser();
    }

    public class CartProductAppService : ICartProductAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _session;
        public CartProductAppService(IAbpSession session, IUnitOfWork unitOfWork)
        {
            _session = session;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<int> AddToCart([FromBody] CartProductReqDto input)
        {
            // check feature 
            var feature = _unitOfWork.GetRepository<Shared.Entitys.FeatureProductEntity>().GetAll()
                                     .Where(w => w.Id == input.IdFeature);
            var order = _unitOfWork.GetRepository<Shared.Entitys.OrderEntity>().GetAll()
                                   .Where(w => w.CreatorUserId == _session.UserId && w.FutureProductId == input.IdFeature
                                            && w.IsActive == true);
            var product = _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>().GetAll();

            if (feature.Count() != 1) throw new ClientException("FEATURE", ERROR_DATA.DATA_NULL);

            if (order.Count() == 0)
            {
                var productId = feature.Join(product, i => i.ProductId, o => o.Id, (i, o) => o.SupplierId).FirstOrDefault();
                if (productId == 0) throw new ClientException("FEATURE", ERROR_DATA.DATA_NULL);

                // insert
                var orderItem = new OrderEntity
                {
                    IsActive = true,
                    IsDeleted = false,
                    CreatorUserId = _session.UserId,
                    LastModifierUserId = _session.UserId,
                    FutureProductId = input.IdFeature,
                    NumberOrder = input.NumberProduct,
                    IdSupplier = productId
                };

                _unitOfWork.GetRepository<Shared.Entitys.OrderEntity>().Insert(orderItem);
                _unitOfWork.SaveChanges();
            }
            else
            {
                // update
                var orderDb = order.FirstOrDefault();
                orderDb.NumberOrder += input.NumberProduct;

                _unitOfWork.GetRepository<Shared.Entitys.OrderEntity>().Update(orderDb);
                _unitOfWork.SaveChanges();
            }

            return 1;
        }

        [HttpGet]
        public async Task<List<ReadCartProductResDto>> ReadCartForUser()
        {
            var order = _unitOfWork.GetRepository<Shared.Entitys.OrderEntity>().GetAll()
                                   .Where(w => w.CreatorUserId == _session.UserId && w.IsActive == true);
            var feature = _unitOfWork.GetRepository<Shared.Entitys.FeatureProductEntity>().GetAll()
                                     .Where(w => w.IsActive == true);
            var product = _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>().GetAll()
                                     .Where(w => w.IsActive == true);
            var supplier = _unitOfWork.GetRepository<Shared.Entitys.SupplierEntity>().GetAll()
                                      .Where(w => w.IsActive == true);
            var file = _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().GetAll()
                                     .Where(w => w.IsActive == true);

            var productOrder = from o in order
                               join fp in feature on o.FutureProductId equals fp.Id
                               join p in product on fp.ProductId equals p.Id
                               join s in supplier on p.SupplierId equals s.Id
                               join fs in file on fp.PictureId equals fs.Id
                               where o.IsActive == true && o.CreatorUserId == _session.UserId
                               select new ReadCartProductResDto
                               {
                                   IdShop = s.Id,
                                   ShopName = s.NameShop,
                                   ProductId = p.Id,
                                   FeatureId = fp.Id,
                                   Name = fp.Name,
                                   NumberProduct = o.NumberOrder,
                                   Prices = fp.Price,
                                   ImageProduct = string.Format("{0}/{1}",fs.Folder, fs.VirtualPath)
                               };
            return productOrder.ToList();
        }
    }
}
