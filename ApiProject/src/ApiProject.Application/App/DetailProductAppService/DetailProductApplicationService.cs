using Abp;
using Abp.Runtime.Session;
using ApiProject.Authorization;
using ApiProject.Authorization.Users;
using ApiProject.FileExtention;
using ApiProject.MappingExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.DataTransfer.DetailProduct;
using UnitOfWork;
using Utils.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiProject.App.DetailProductAppService
{
    public class DetailProductApplicationService : IDetailProductApplicationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;
        private readonly ISupplierSession _supplierConfigGlobal;
        private readonly UserManager _userManager;

        public DetailProductApplicationService(IUnitOfWork unitOfWork, IAbpSession abpSession, ISupplierSession supplierConfigGlobal, UserManager userManager)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
            _supplierConfigGlobal = supplierConfigGlobal;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<DetailInfoBasicProductDto> GetDefaultProduct(long idsp)
        {
            var a = _abpSession.UserId;
            var iii = _supplierConfigGlobal.Id;
            var rsl = new DetailInfoBasicProductDto();
            // check product
            var product = await _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>()
                                           .GetFirstOrDefaultAsync(predicate: s => s.Id == idsp && s.ShowOnHomepage == true)
                          ?? throw new ClientException("PRODUCT", ERROR_DATA.CHECK_FAIL);
            var data = _unitOfWork.GetRepository<Shared.Entitys.FeatureProductEntity>().GetAll().Where(s => s.ProductId == idsp);
            var attribute = _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().GetAll();
            var attributeValue = _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>().GetAll();
            if (!data.Any()) throw new ClientException("PRODUCT", ERROR_DATA.DATA_NULL);

            // getvalue
            var productSingle = data.FirstOrDefault();
            rsl.AttributeIdOneName = attribute.FirstOrDefault(a => a.Id == productSingle.AttributeIdOne)?.Name;
            rsl.AttributeIdTwoName = attribute.FirstOrDefault(a => a.Id == productSingle.AttributeIdTwo)?.Name;
            rsl.AttributeIdThreeName = attribute.FirstOrDefault(a => a.Id == productSingle.AttributeIdThree)?.Name;
            rsl.AttributeIdOne = productSingle.AttributeIdOne;
            rsl.AttributeIdTwo = productSingle.AttributeIdTwo;
            rsl.AttributeIdThree = productSingle.AttributeIdThree;

            // get info product
            rsl.FullDescription = product.FullDescription;
            rsl.UnitProduct = product.UnitProduct;
            rsl.UnitProductValue = attribute.FirstOrDefault(s => s.Id == product.UnitProduct)?.Name;
            rsl.Trademark = product.Trademark;
            rsl.TrademarkValue = attribute.FirstOrDefault(s => s.Id == product.Trademark)?.Name;
            rsl.Fragile = product.Fragile;
            rsl.OrderMaximumQuantity = product.OrderMaximumQuantity;
            rsl.OrderMinimumQuantity = product.OrderMinimumQuantity;

            // load attriute
            List<ProductSpecificationsAttributeDto> speccificationAttributes = new();
            var speccificationAttribute = _unitOfWork.GetRepository<Shared.Entitys.ProductSpecificationsValueEntity>()
                                                     .GetAll().Where(s => s.ProductId == idsp)
                                                     .Join(inner: attribute,
                                                           outerKeySelector: spvl => spvl.AttributeId,
                                                           innerKeySelector: sp => sp.Id,
                                                           resultSelector: (value, attr) => new ProductSpecificationsAttributeDto
                                                           {
                                                               Group = value.Group,
                                                               AttributeId = value.AttributeId,
                                                               Value = value.Value,
                                                               AttributeValue = attr.Name
                                                           });

            rsl.SpeccificationAttribute = speccificationAttribute.ToList();

            return rsl;
        }

        [HttpGet]
        public async Task<List<ImageProductContainerDto>> GetImageProduct(long idsp)
        {
            const string FOLDER_IMAGE_ROOT = "Zzartjvost";
            const string SIZE_FULL = "FULL";
            List<ImageProductContainerDto> rsl = new();
            //check id
            var isIddProduct = await _unitOfWork.GetRepository<Shared.Entitys.ProductEntity>()
                                                .CountAsync(p => p.Id == idsp);
            if (isIddProduct != 1) throw new ClientException("PRODUCT", ERROR_DATA.UNKNOWN);

            var dbImageMapp = _unitOfWork.GetRepository<Shared.Entitys.ProductImageMappingEntity>().GetAll();
            var dbImage = _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().GetAll();
            var images = dbImageMapp.Where(p => p.ProductId == idsp)
                         .Join(inner: dbImage.Where(pp => pp.Folder == FOLDER_IMAGE_ROOT
                                                       && pp.IsActive == true
                                                       && pp.Size != SIZE_FULL
                                                       && pp.ImageRoot != null
                                                       && pp.Types == (int)TypeFile.Image
                                                   ),
                               outerKeySelector: o => o.ImageSourceId,
                               innerKeySelector: i => i.Id,
                               resultSelector: (m, f) => new
                               {
                                   f.Id,
                                   f.ImageName,
                                   f.MimeType,
                                   f.Size,
                                   f.SeoFilename,
                                   f.AltAttribute,
                                   f.TitleAttribute,
                                   f.VirtualPath,
                                   f.Folder
                               });
            // get all size 
            var allSize = images.Select(s => s.Size).Distinct().ToList();
            foreach (var size in allSize)
            {
                var imageProductContainerDto = new ImageProductContainerDto();
                var imagefilter = images.Where(w => w.Size == size).ToList().DistinctBy(p => p.ImageName).ToList();
                imageProductContainerDto.Size = size;
                string folder = imagefilter.FirstOrDefault()?.Folder;
                imageProductContainerDto.Image = (imagefilter.Select(s => new ImageForProductDto
                {
                    VirtualPath = string.Format("/{0}/{1}", folder, s.VirtualPath),
                    AltAttribute = s.AltAttribute,
                    SeoFilename = s.SeoFilename,
                    TitleAttribute = s.TitleAttribute,
                    DisplayOrder = 0
                })).Distinct().ToList();
                rsl.Add(imageProductContainerDto);
            }
            return rsl;
        }

        [HttpGet]
        public async Task<List<FeatureProductReadDto>> GetFeatureDefault(long idsp)
        {
            List<FeatureProductReadDto> rsl = new();
            var data = _unitOfWork.GetRepository<Shared.Entitys.FeatureProductEntity>().GetAll();
            var attribute = _unitOfWork.GetRepository<Shared.Entitys.AttributeEntity>().GetAll();
            var valueAttribute = _unitOfWork.GetRepository<Shared.Entitys.ProductAttributeValueEntity>().GetAll();
            var imageDb = _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().GetAll();

            var rslTemp = data.Where(w => w.ProductId == idsp && w.IsActive == true).ToList()
                              .Select(s => MappingData.InitializeAutomapper().Map<FeatureProductReadDto>(s));
            rsl = rslTemp.Select(s =>
            {
                s.AttributeValueOneName = valueAttribute.FirstOrDefault(f => f.Id == s.AttributeValueOne)?.Values;
                s.AttributeValueTwoName = valueAttribute.FirstOrDefault(f => f.Id == s.AttributeValueTwo)?.Values;
                s.AttributeValueThreeName = valueAttribute.FirstOrDefault(f => f.Id == s.AttributeValueThree)?.Values;
                s.PictureName = imageDb.FirstOrDefault(v => v.Id == s.PictureId).ImageName;
                return s;
            }).ToList();
            return rsl;
        }

    }
}
