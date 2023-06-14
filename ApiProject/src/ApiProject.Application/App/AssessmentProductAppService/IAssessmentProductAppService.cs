using Abp.Application.Services;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.AssessmentProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork.Collections;

namespace ApiProject.App.AssessmentProductAppService
{
    public interface IAssessmentProductAppService : IApplicationService
    {
        Task<int> Create(AssessmentProductReq input);
        Task<AssessmentProductStat> GetStarProduct(long idsp);
        Task<List<AssessmentProductImage>> GetAssessmentProductImage(long idsp);
        Task<IPagedList<AssessmentProductComment>> GetAssessmentProductCommnet(SearchRequest input);
        Task<int> ChangeLikeOrDislikeAssessment(LikeCommentAssessmentProduct input);
    }
}
