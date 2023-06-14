using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Runtime.Session;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.AssessmentProduct;
using ApiProject.Shared.Entitys;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;
using Utils.ImageProcess.Dto;
using Utils.ImageProcess;
using ApiProject.FileExtention;
using Utils.ImageProcess.Enum;

namespace ApiProject.App.AssessmentProductAppService
{
    public class AssessmentProductAppService : IAssessmentProductAppService
    {
        [Obsolete]
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public AssessmentProductAppService(IUnitOfWork unitOfWork, IAbpSession abpSession, IHostingEnvironment hostingEnvironment)
        {
            _abpSession = abpSession;
            _unitOfWork = unitOfWork;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpPost]
        public async Task<int> Create([FromBody] AssessmentProductReq input)
        {
            const string FOLDER_IMAGE_ROOT = "Zzartjvost";

            // check
            if (_abpSession.UserId == null) throw new ClientException("LOGIN", ERROR_DATA.DATA_NULL);
            // check any
            foreach (var item in input.Image) if (!File.Exists(_hostingEnvironment.WebRootPath + item)) throw new ClientException("IMAGE", ERROR_DATA.DATA_NULL);
            var listImage = input.Image;

            //sử lý ảnh 2 loại 340x340 and 80x80
            List<ImageResizeOutput> imgRsl = new();
            // check image
            OpenFile openImage = new();
            SquareImage squareImage = new();
            SaveFile save = new();

            input.Image.ForEach(async image =>
            {
                var bitmapLst = await openImage.ReadImageToBitmap(image);
                if (bitmapLst is null) throw new ClientException("IMAGE", ERROR_DATA.DATA_NULL);
                var convertSquareImage = squareImage.ConvertSquareImage(bitmapLst);
                if (convertSquareImage is null) throw new ClientException("IMAGE", ERROR_DATA.WRONG_FORMAT);
                // resize
                var sizeImageConvert = ResizeImage.ResizeImageToBitmap(new List<ResizeImageDto>() { new ResizeImageDto(convertSquareImage, true) });
                // save image
                foreach (var sic in sizeImageConvert) imgRsl.Add(save.SaveImageConvert(sic));
            });

            // add image root
            var imageRoot = imgRsl.Select(s => new FileSourceEntity
            {
                ImageName = Path.GetFileName(s.Url).Substring(0, 36),
                MimeType = MimeType.JPEGImages,
                SeoFilename = string.Empty,
                AltAttribute = string.Empty,
                TitleAttribute = string.Empty,
                IsNew = true,
                VirtualPath = Path.GetFileName(s.Url),
                Size = s.Size,
                Folder = FOLDER_IMAGE_ROOT,
                ImageRoot = null,
                Types = (int)TypeFile.Image,
                IsActive = true,
                IsDeleted = false
            }).ToList();

            _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().Insert(imageRoot);
            _unitOfWork.SaveChanges();

            // insert Assessment
            var assessmentProduct = new AssessmentProductEntity()
            {
                Comment = input.Commnet,
                Star = input.StarNumber,
                Feel = JsonConvert.SerializeObject(input.Feel),
                Level = input.Level,
                AttributeIdOne = 1,
                AttributeIdTwo = 10039,
                AttributeIdThree = 10040,
                AttributeValueOne = 1,
                AttributeValueTwo = 10062,
                AttributeValueThree = 10067,
                AssessmentProductId = input.AssessmentProductId,
                CreatorUserId = _abpSession.UserId,
                LastModifierUserId = _abpSession.UserId,
                IsNew = true
            };

            _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>().Insert(assessmentProduct);
            _unitOfWork.SaveChanges();

            // mapping image vs assessment
            var mappingContainer = imageRoot.Select(s => new AssessmentImageProductEntity
            {
                ImageSourceId = s.Id,
                AssessmentProductId = assessmentProduct.Id,
                IsActive = true,
                IsDeleted = false,
                CreatorUserId = _abpSession.UserId,
                LastModifierUserId = _abpSession.UserId
            });

            _unitOfWork.GetRepository<Shared.Entitys.AssessmentImageProductEntity>().Insert(mappingContainer);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpGet]
        public async Task<AssessmentProductStat> GetStarProduct(long idsp)
        {
            var assessmentProducts = _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>()
                                    .GetAll().Where(s => s.AssessmentProductId == idsp);
            AssessmentProductStat rsl = new()
            {
                StarOne = assessmentProducts.Count(s => s.Star == 1),
                StarTwo = assessmentProducts.Count(s => s.Star == 2),
                StarThree = assessmentProducts.Count(s => s.Star == 3),
                StarForur = assessmentProducts.Count(s => s.Star == 4),
                StarFive = assessmentProducts.Count(s => s.Star == 5),
                StarTotal = assessmentProducts.Count()
            };
            return rsl;
        }

        public Task<List<AssessmentProductImage>> GetAssessmentProductImage(long idsp)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        public async Task<IPagedList<AssessmentProductComment>> GetAssessmentProductCommnet(SearchRequest input)
        {
            var isSp = long.TryParse(input.ValuesSearch[0], out long idsp);
            if (!isSp) throw new ClientException("DATA", ERROR_DATA.DATA_NULL);

            var rsl = new List<AssessmentProductComment>();
            var assessmentProductComment = _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>().GetAll()
                                                      .Where(w => w.AssessmentProductId == idsp && w.Level == 1 && w.IsActive == true
                                                               && w.IsDeleted == false);

            if (assessmentProductComment == null || !assessmentProductComment.Any())
                throw new ClientException("DATA", ERROR_DATA.DATA_NULL);

            var useLogin = _unitOfWork.GetRepository<UserAccount>().GetAll()
                                      .Where(w => w.TenantId == _abpSession.TenantId && w.IsDeleted == false);

            var image = _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().GetAll()
                                   .Where(w => w.IsActive == true && w.IsDeleted == false);

            var attribute = _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().GetAll()
                                       .Where(w => w.IsActive == true && w.IsDeleted == false);

            var attributeValue = _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>().GetAll()
                                            .Where(w => w.IsActive == true && w.IsDeleted == false);

            var assessmentProductLike = _unitOfWork.GetRepository<Shared.Entitys.LikeEvaluatesProductEntity>().GetAll()
                                                   .Where(w => w.IsActive == true && w.IsDeleted == false);

            var imageMapping = _unitOfWork.GetRepository<Shared.Entitys.AssessmentImageProductEntity>().GetAll()
                                          .Where(w => w.IsActive == true && w.IsDeleted == false);

            // lấy top data cần lấy để hạn chế join số lượng bảng lớn. Hạn chế càn quyét csdl
            var assessmentProductCommentTemp = (assessmentProductComment.Skip(input.PageIndex * input.PageSize).Take(input.PageSize)).ToList();
            if (!assessmentProductCommentTemp.Any()) throw new ClientException("DATA", ERROR_DATA.DATA_NULL);
            // quét từng bảng ,lấy dữ liệu cần thiết cho tất cả các record được chọn

            // Bảng tài khoản
            var accountIdTemp = assessmentProductCommentTemp.Select(s => s.CreatorUserId).ToList();
            var accountSelected = useLogin.Where(s => accountIdTemp.Contains(s.Id))
                                          .Select(s => new AssessmentProductUserComment { Id = s.Id, Name = s.UserName, Time = s.CreationTime }).ToList();
            if (!accountSelected.Any()) throw new ClientException("DATA", ERROR_DATA.DATA_NULL);
            // Bảng Attribute
            var attributeTemp = assessmentProductCommentTemp.FirstOrDefault();
            var attributeSelected = attribute.Where(w => w.Id == attributeTemp.AttributeIdOne
                                                      || w.Id == attributeTemp.AttributeIdTwo
                                                      || w.Id == attributeTemp.AttributeIdThree)
                                             .Select(s => new { s.Id, s.Name })
                                             .ToList();
            // Bảng Attribute Value
            List<long?> attributeValueTemp = new();
            assessmentProductCommentTemp.ForEach(s => attributeValueTemp.AddRange(new List<long?>() { s.AttributeValueOne, s.AttributeValueTwo, s.AttributeValueThree }));
            var attributeValueSelected = attributeValue.Where(w => attributeValueTemp.Contains(w.Id))
                                                       .Select(s => new { s.Id, s.Values })
                                                       .ToList();

            var assessmentProductIdCommentTemp = assessmentProductCommentTemp.Select(s => (long?)s.Id).ToList();
            var imageSelected = imageMapping.Where(w => assessmentProductIdCommentTemp.Contains(w.AssessmentProductId))
                                .Join(inner: image,
                                      outerKeySelector: o => o.ImageSourceId,
                                      innerKeySelector: i => i.Id,
                                      resultSelector: (o, i) => new ImageQuerySellected
                                      {
                                          Name = i.ImageName,
                                          AssessmentProductId = o.AssessmentProductId,
                                          Size = i.Size,
                                          Folder = i.Folder,
                                          VirtualPath = i.VirtualPath
                                      });

            var imageSelectedGroup = imageSelected.ToList().GroupBy(g1 => g1.AssessmentProductId).ToList();

            // lấy thông tin tài khoản đang đăng nhập tương tác đánh giá

            var getAssessmentProductLike = assessmentProductLike.Where(w => assessmentProductIdCommentTemp.Contains(w.EvaluatesId)).ToList();

            // create container
            var result = assessmentProductCommentTemp.Select(s => new AssessmentProductComment
            {
                UserComment = accountSelected.FirstOrDefault(acc => acc.Id == s.CreatorUserId),
                Star = s.Star,
                Commnet = s.Comment,
                AttributeProductComment = new List<AttributeProductComment>()
                {
                    new AttributeProductComment
                    {
                        AttributeKeyName = attributeSelected.FirstOrDefault(w=>w.Id == s.AttributeIdOne).Name,
                        AttributeValueName = attributeValueSelected.FirstOrDefault(w=>w.Id == s.AttributeValueOne).Values
                    },
                    new AttributeProductComment
                    {
                        AttributeKeyName = attributeSelected.FirstOrDefault(w=>w.Id == s.AttributeIdTwo).Name,
                        AttributeValueName = attributeValueSelected.FirstOrDefault(w=>w.Id == s.AttributeValueTwo).Values
                    },
                    new AttributeProductComment
                    {
                        AttributeKeyName = attributeSelected.FirstOrDefault(w=>w.Id == s.AttributeIdThree).Name,
                        AttributeValueName = attributeValueSelected.FirstOrDefault(w=>w.Id == s.AttributeValueThree).Values
                    },
                },
                Image = HandleImage(imageSelectedGroup, s.Id)
            });

            // return
            return result.MapToPagedList(input.PageIndex, input.PageSize, assessmentProductComment.Count(), 0);
        }

        private static List<AssessmentProductImage> HandleImage(List<IGrouping<long, ImageQuerySellected>> image, long id)
        {
            List<AssessmentProductImage> rsl = new();
            image.ForEach(r =>
            {
                if (r.Key == id)
                {
                    r.GroupBy(g1 => g1.Name).ToList().ForEach(r2 =>
                    {
                        AssessmentProductImage rslTemp = new();
                        r2.ToList().ForEach(r2 =>
                        {
                            if (r2.Size == ConfigSizeImage.NameSizeDefault(SizeImage.S80x80))
                                rslTemp.ImageName80x80 = string.Format("/{0}/{1}", r2.Folder, r2.VirtualPath);

                            else if (r2.Size == ConfigSizeImage.NameSizeDefault(SizeImage.S340x340))
                                rslTemp.ImageName340x340 = string.Format("/{0}/{1}", r2.Folder, r2.VirtualPath);
                        });
                        rsl.Add(rslTemp);
                    });
                }
            });
            return rsl;
        }

        [HttpPost]
        public async Task<int> ChangeLikeOrDislikeAssessment([FromBody] LikeCommentAssessmentProduct input)
        {
            if (input == null) throw new ClientException("DATA", ERROR_DATA.DATA_NULL);
            var isProduct = await _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>().ExistsAsync(s => s.Id == input.Idsp);
            var isAssessment = await _unitOfWork.GetRepository<Shared.Entitys.AssessmentProductEntity>()
                                                .ExistsAsync(s => s.Id == input.IdAssessment && s.Level == input.Level);

            if (!isProduct || !isAssessment) throw new ClientException("DATA", ERROR_DATA.DATA_NULL);

            // check exists
            var recordExists = await _unitOfWork.GetRepository<Shared.Entitys.LikeEvaluatesProductEntity>()
                                                .GetFirstOrDefaultAsync(predicate: s => s.CreatorUserId == _abpSession.UserId
                                                                                     && s.EvaluatesId == input.IdAssessment);

            if (recordExists is null)
            {
                var ins = new LikeEvaluatesProductEntity
                {
                    Islike = input.TypeLike == TypeLikeComment.IsLike ? input.Status : false,
                    Isdislike = input.TypeLike == TypeLikeComment.IsDislike ? input.Status : false,
                    EvaluatesId = input.IdAssessment,
                    IsActive = true,
                    IsDeleted = false,
                    CreatorUserId = _abpSession.UserId,
                    LastModifierUserId = _abpSession.UserId,
                };

                _unitOfWork.GetRepository<Shared.Entitys.LikeEvaluatesProductEntity>().Insert(ins);
                _unitOfWork.SaveChanges();
                return 1;
            }
            else
            {
                recordExists.Islike = input.TypeLike == TypeLikeComment.IsLike ? input.Status : false;
                recordExists.Isdislike = input.TypeLike == TypeLikeComment.IsDislike ? input.Status : false;
                _unitOfWork.GetRepository<Shared.Entitys.LikeEvaluatesProductEntity>().Update(recordExists);
                _unitOfWork.SaveChanges();
                return 1;
            }
        }
    }
}
