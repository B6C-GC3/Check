using Abp.Application.Services;
using Abp.Runtime.Session;
using ApiProject.Aggregate;
using ApiProject.Authorization;
using ApiProject.MappingExtention;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.AssessmentProduct;
using ApiProject.Shared.DataTransfer.ProductSupplier;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Crypto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;

namespace ApiProject.Supplier.ProductSupplier
{
    public interface IProductSupplierAppservice : IApplicationService
    {
        Task<IPagedList<ProductSupplierDto>> GetProduct(SearchRequest input);
    }

    public class ProductSupplierAppService : IProductSupplierAppservice
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplier;

        public ProductSupplierAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplier)
        {
            _abpSession = abpSession;
            _supplier = supplier;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IPagedList<ProductSupplierDto>> GetProduct(SearchRequest input)
        {
            var rsl = new List<ProductSupplierDto>();

            var product = await _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>()
                                           .GetPagedListAsync(predicate: p => p.SupplierId == _supplier.SupplierId,
                                                              pageIndex: input.PageIndex,
                                                               pageSize: input.PageSize);

            rsl = product.Items.Select(s => MappingData.InitializeAutomapper().Map<ProductSupplierDto>(s)).ToList();

            // get feaure product 
            var feature = _unitOfWork.GetRepository<Shared.Entitys.FeatureProductEntity>().GetAll();
            // attribute 
            var attribute = _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().GetAll();
            var assessmentProducts = _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>().GetAll();
            foreach (var item in rsl)
            {
                var star = assessmentProducts.Where(s => s.AssessmentProductId == item.Id && s.Level == 1);
                item.AvgStar = StarProductAssessment.AvgStar(new AssessmentProductStat
                {
                    StarOne = star.Count(s => s.Star == 1),
                    StarTwo = star.Count(s => s.Star == 2),
                    StarThree = star.Count(s => s.Star == 3),
                    StarForur = star.Count(s => s.Star == 4),
                    StarFive = star.Count(s => s.Star == 5),
                    StarTotal = star.Count()
                });
                item.FeatureNumber = feature.Count(c => c.ProductId == item.Id);
                item.TrademarkName = attribute.FirstOrDefault(f => f.Id == item.Trademark)?.Name;
            }

            return rsl.MapToPagedList(pageIndex: input.PageIndex, pageSize: input.PageSize, product.TotalCount, 0);
        }
    }
}
