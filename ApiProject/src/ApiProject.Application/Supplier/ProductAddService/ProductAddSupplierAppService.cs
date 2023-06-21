using Abp.Runtime.Session;
using ApiProject.AttributeCustomCore;
using ApiProject.FileExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.DataTransfer.Product;
using ApiProject.Shared.Entitys;
using ApiProject.UL;
using UnitOfWork;
using Utils.Any;
using Utils.Exceptions;
using Utils.ImageProcess;
using Utils.ImageProcess.Dto;
using Utils.ImageProcess.Enum;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.Supplier.ProductAddService
{
    public class ProductAddSupplierAppService : IProductAddSupplierAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public ProductAddSupplierAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [Transaction]
        [HttpPost]
        public async Task<int> InsertProduct([FromBody] ProductAddInsertsDto input)
        {
            // Phạm vi sản phẩm :: ProductAvailabilityRange
            // process image
            var imgs = await HanldImage(input.Images);
            // product
            var resultProduct = await HanldProduct(input.InfoBasic);
            // Category
            await HandlCategory(input.Categorys, resultProduct.Id);
            // SPECIFICATIONS
            await HandlAttribute(input.TechProduct, resultProduct.Id);
            // Image
            Dictionary<string, long> idRootImagetoSizeS220x220 = new Dictionary<string, long>();

            var imageTemp = imgs.Where(s => s.ImageRoot is null).ToList();

            imageTemp.ForEach(v =>
            {
                var nameImage = Path.GetFileName(v.ImageName);
                var size = imgs.Where(s => s.ImageRoot == v.Id && s.Size == ConfigSizeImage.NameSizeDefault(SizeImage.S220x220)).FirstOrDefault();
                idRootImagetoSizeS220x220.Add(nameImage, size.Id);
            });

            // FutureProduct
            var futureProductTemp = new List<Shared.Entitys.FeatureProductEntity>();
            var attributeProduct = new List<long?>();
            var attributeValueProduct = new List<long?>();
            foreach (var future in input.FutureProduct)
            {
                attributeProduct.AddRange(new List<long?> { future.KeyAttributeOne, future.KeyAttributeTwo, future.KeyAttributeThree });
                attributeValueProduct.AddRange(new List<long?> { future.IdKeyAttributeOne, future.IdKeyAttributeTwo, future.IdKeyAttributeThree });
                futureProductTemp.Add(new FeatureProductEntity
                {
                    Name = future.Name,
                    AttributeIdOne = (long)future.IdKeyAttributeOne,
                    AttributeIdTwo = future.IdKeyAttributeTwo,
                    AttributeIdThree = future.IdKeyAttributeThree,
                    AttributeValueOne = (long)future.KeyAttributeOne,
                    AttributeValueTwo = (long)future.KeyAttributeTwo,
                    AttributeValueThree = (long)future.KeyAttributeThree,
                    ProductId = resultProduct.Id,
                    WeightAdjustment = default,
                    LengthAdjustment = default,
                    WidthAdjustment = default,
                    HeightAdjustment = default,
                    Price = future.Price.ToDecimal(),
                    Quantity = future.Quantity.ToInt(),
                    DisplayOrder = future.DisplayOrder.ToInt(),
                    PictureId = (idRootImagetoSizeS220x220.FirstOrDefault(s => s.Key == Path.GetFileName(future.Avatar).Substring(0, 36))).Value,
                    MainProduct = false,
                    IsActive = true,
                    IsDeleted = false
                });
            }

            attributeProduct = attributeProduct.Distinct().ToList();
            attributeValueProduct = attributeValueProduct.Distinct().ToList();

            // check attribute
            var countAttribute = _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                            .Count(p => attributeProduct.Contains(p.Id));
            var countAttributeValue = _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>()
                                            .Count(p => attributeValueProduct.Contains(p.Id));

            if (countAttribute != attributeProduct.Count || countAttributeValue != attributeValueProduct.Count)
                throw new ClientException("ATTRIBUTE", ERROR_DATA.CHECK_FAIL);

            _unitOfWork.GetRepository<Shared.Entitys.FeatureProductEntity>().Insert(futureProductTemp);
            _unitOfWork.SaveChanges();

            // mapping image 
            var lstImage = new List<Shared.Entitys.ProductImageMappingEntity>();
            imgs.ForEach(p => lstImage.Add(new ProductImageMappingEntity
            {
                ImageSourceId = p.Id,
                ProductId = resultProduct.Id,
            }));

            _unitOfWork.GetRepository<Shared.Entitys.ProductImageMappingEntity>().Insert(lstImage);
            _unitOfWork.SaveChanges();
            return 1;
        }

        private async Task<List<FileSourceEntity>> HanldImage(List<string> images)
        {
            const string FOLDER_IMAGE_ROOT = "Zzartjvost";
            List<ImageResizeOutput> imgRsl = new();
            // check image
            OpenFile openImage = new();
            SquareImage squareImage = new();
            SaveFile save = new();
            var fileSaveDatabase = new List<Shared.Entitys.FileSourceEntity>();
            // add image root
            var imageRoot = images.Select(s => new FileSourceEntity
            {
                ImageName = Path.GetFileName(s).Substring(0, 32),
                MimeType = MimeType.JPEGImages,
                SeoFilename = string.Empty,
                AltAttribute = string.Empty,
                TitleAttribute = string.Empty,
                IsNew = true,
                VirtualPath = Path.GetFileName(s),
                Size = "FULL",
                Folder = FOLDER_IMAGE_ROOT,
                ImageRoot = null,
                Types = (int)TypeFile.Image,
                IsActive = true,
                IsDeleted = false
            }).ToList();

            _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>()
                       .Insert(imageRoot);
            _unitOfWork.SaveChanges();

            // process List image
            foreach (var image in images)
            {
                var bitmapLst = await openImage.ReadImageToBitmap(image);
                if (bitmapLst is null) throw new ClientException("IMAGE", ERROR_DATA.DATA_NULL);
                var convertSquareImage = squareImage.ConvertSquareImage(bitmapLst);
                if (convertSquareImage is null) throw new ClientException("IMAGE", ERROR_DATA.WRONG_FORMAT);

                // resize
                var sizeImageConvert = ResizeImage.ResizeImageToBitmap(new List<ResizeImageDto>() { new ResizeImageDto(convertSquareImage) });

                // save image
                foreach (var sic in sizeImageConvert) imgRsl.Add(save.SaveImageConvert(sic));

                // save database
                foreach (var item in imgRsl)
                {
                    fileSaveDatabase.Add(new FileSourceEntity
                    {
                        ImageName = Path.GetFileName(item.Url).Substring(0, item.Url.Length - 4),
                        MimeType = MimeType.JPEGImages,
                        SeoFilename = string.Empty,
                        AltAttribute = string.Empty,
                        TitleAttribute = string.Empty,
                        IsNew = true,
                        VirtualPath = item.Url,
                        Size = item.Size,
                        Folder = FOLDER_IMAGE_ROOT,
                        ImageRoot = imageRoot.FirstOrDefault(f => f.ImageName == Path.GetFileName(image).Substring(0, 32)).Id,
                        Types = (int)TypeFile.Image,
                        IsActive = true,
                        IsDeleted = false
                    });
                }
            }
            _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>()
                       .Insert(fileSaveDatabase);
            _unitOfWork.SaveChanges();
            fileSaveDatabase.AddRange(imageRoot);
            return fileSaveDatabase;
        }

        private async Task<ProductEntity> HanldProduct(ProductAddQueryDto input)
        {
            // Table: Product
            const int ATTRIBUTE_SUCCESS = 2;
            var productRsl = new ProductEntity();
            // check UnitProduct
            var isCheckValueAttribute = await _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>()
                                                         .CountAsync(e => e.Id == input.Trademark || e.Id == input.UnitProduct);
            if (isCheckValueAttribute != ATTRIBUTE_SUCCESS) throw new ClientException("ATTRIBUTE", ERROR_DATA.CHECK_FAIL);

            productRsl = new ProductEntity()
            {
                Name = input.Name,
                Fragile = input.Fragile,
                Trademark = input.Trademark,
                UnitProduct = input.UnitProduct
            };

            

            _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>().Insert(productRsl);
            await _unitOfWork.SaveChangesAsync();
            return productRsl;
        }

        private async Task HandlCategory(List<long> input, long idProduct)
        {
            // Bảng :: ProductCategoryMapping, CategoryProduct
            // lấy tất cả Category có liên quan ra (lấy từ level cao xuống thấp, không lấy ngược lại)
            //// var allCategory = 
            // string idCategoryLstStr = JsonConvert.SerializeObject(input)
            //                                      .Replace("[", string.Empty).Replace("]", string.Empty);
            // var data = await CategorySimpleCmd.LoadCategoryByTree(_unitOfWork, idCategoryLstStr);
            // bug : nếu client open full => số lượng bản ghi rất lớn có thể lên đến vài ngàn bản ghi!
            _unitOfWork.GetRepository<Shared.Entitys.ProductCategoryMappingEntity>()
                       .Insert(input.Select(s => new ProductCategoryMappingEntity
                       {
                           CategoryId = s,
                           ProductId = idProduct,
                           IsActive = true,
                           IsDeleted = false
                       }));
            _unitOfWork.SaveChanges();
        }

        private async Task HandlAttribute(string tech, long idProduct)
        {
            // convert to Dictionary List
            var value = JsonConvert.DeserializeObject<List<GroupSpecification>>(tech);
            var unit = _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>();
            var tempSpeci = new List<Shared.Entitys.ProductSpecificationsValueEntity>();
            var getAllIdAttribute = new List<long>();
            // tách data
            foreach (var group in value)
            {
                foreach (var item in group.Value)
                {
                    getAllIdAttribute.Add(item.Key);
                    tempSpeci.Add(new ProductSpecificationsValueEntity
                    {
                        AttributeId = item.Key,
                        Value = item.Value,
                        ProductId = idProduct,
                        Group = group.Key,
                        IsActive = true,
                        IsDeleted = false
                    });
                }
            }
            // check data
            var countAttribute = await unit.CountAsync(p => getAllIdAttribute.Contains(p.Id) && p.Types == (int)AttributeUL.SPECIFICATIONS);
            if (countAttribute != getAllIdAttribute.Count) throw new ClientException("ATTRIBUTE", ERROR_DATA.CHECK_FAIL);
            _unitOfWork.GetRepository<Shared.Entitys.ProductSpecificationsValueEntity>().Insert(tempSpeci);
            _unitOfWork.SaveChanges();
        }

        private void ClearDataTemp()
        {
            // Bảng :: 
        }
    }
}
