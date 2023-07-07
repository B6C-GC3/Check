using Abp.Application.Services;
using Abp.Authorization.Users;
using Abp.Runtime.Session;
using ApiProject.Aggregate;
using ApiProject.Authorization;
using ApiProject.MappingExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.AssessmentProduct;
using ApiProject.Shared.DataTransfer.AssessmentSupplier;
using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Microsoft.AspNetCore.Mvc;
using NPOI.SS.Formula.Functions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Supplier.AssessmentSupplierAppService
{
    public interface IAssessmentSupplierAppService : IApplicationService
    {
        Task<AssessmentSupplierOverviewDto> GetOverrview(long productId);
        Task<IPagedList<AssessmentSupplierCommentDto>> GetCommentProduct(SearchRequest input);
        Task<int> WatchedComment(List<long> ids);
    }

    public class AssessmentSupplierAppService : IAssessmentSupplierAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplier;

        public AssessmentSupplierAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplier)
        {
            _abpSession = abpSession;
            _supplier = supplier;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IPagedList<AssessmentSupplierCommentDto>> GetCommentProduct(SearchRequest input)
        {
            // xác minh
            if (input == null) throw new ClientException("INPUT", ERROR_DATA.DATA_NULL);
            // định danh
            var isProductId = long.TryParse(input.ValuesSearch[0], out long productId);
            var isLevel = int.TryParse(input.ValuesSearch[1], out int level);

            // truy vấn
            var commentRoot = await _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>()
                                               .GetPagedListAsync(predicate: p => (productId != 0
                                                                                  ? p.AssessmentProductId != null
                                                                                  : p.AssessmentProductId == productId)
                                                                               && p.Level == level,
                                                                  pageIndex: input.PageIndex - 1,
                                                                   pageSize: input.PageSize,
                                                                    orderBy: o => o.OrderByDescending(i => i.IsNew));
            var image = _unitOfWork.GetRepository<Shared.Entitys.AssessmentImageProductEntity>().GetAll();
            var user = from us in _unitOfWork.GetRepository<UserAccount>().GetAll()
                       join up in _unitOfWork.GetRepository<Shared.Entitys.UserProfile>().GetAll() on us.Id equals up.CreatorUserId
                       select new { Id = us.Id, Name = up.Name };
            var product = _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>().GetAll();
            // kiểm định
            var rsl = commentRoot.Items.Select(s =>
            {
                var rslTemp = MappingData.InitializeAutomapper().Map<AssessmentSupplierCommentDto>(s);
                rslTemp.ProductName = product.FirstOrDefault(f => f.Id == rslTemp.AssessmentProductId).Name;
                rslTemp.NumberImage = image.Count(c => c.AssessmentProductId == s.Id);
                rslTemp.NameUser = user.FirstOrDefault(w => w.Id == s.CreatorUserId).Name;
                return rslTemp;
            });

            // kết luận
            return rsl.MapToPagedList(input.PageIndex, input.PageSize, commentRoot.TotalPages, 0);
        }

        [HttpGet]
        public async Task<AssessmentSupplierOverviewDto> GetOverrview(long productId)
        {
            if (productId == 0) throw new ClientException("PRODUCT_ID", ERROR_DATA.DATA_NULL);

            var rsl = new AssessmentSupplierOverviewDto();
            // check product id
            var product = await _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>()
                                           .GetFirstOrDefaultAsync(predicate: p => p.Id == productId);

            if (product is null || product.SupplierId != _supplier.Id)
                throw new ClientException("PRODUCT_SUPPLIER", ERROR_DATA.CHECK_FAIL);

            var assessmentProducts = _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>().GetAll();
            var star = assessmentProducts.Where(c => c.AssessmentProductId == productId && c.Level == 1);

            rsl.TotalStar = star.Count();
            rsl.TotalComment = assessmentProducts.Count(c => c.AssessmentProductId == productId);
            rsl.AvgStar = StarProductAssessment.AvgStar(new AssessmentProductStat
            {
                StarOne = star.Count(s => s.Star == 1),
                StarTwo = star.Count(s => s.Star == 2),
                StarThree = star.Count(s => s.Star == 3),
                StarForur = star.Count(s => s.Star == 4),
                StarFive = star.Count(s => s.Star == 5),
                StarTotal = star.Count()
            });

            return rsl;
        }

        [HttpPatch]
        public async Task<int> WatchedComment(List<long> ids)
        {
            if (ids.Count == 0) throw new ClientException("INPUT", ERROR_DATA.DATA_NULL);

            var assessmentProducts = _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>()
                                                .GetAll().Where(w => ids.Contains(w.Id));

            if (assessmentProducts.Count() != ids.Count) throw new ClientException("DATA", ERROR_DATA.DATA_NULL);

            var rsl = assessmentProducts.ToList();
            rsl.ForEach(item =>
            {
                item.IsNew = false;
            });

            _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>().Update(rsl);
            _unitOfWork.SaveChanges();
            return rsl.Count;
        }
    }
}
