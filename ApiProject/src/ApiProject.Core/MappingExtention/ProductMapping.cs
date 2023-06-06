using ApiProject.Shared.DataTransfer.DetailProduct;
using ApiProject.Shared.DataTransfer.Supplier;
using ApiProject.Shared.Entitys;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.MappingExtention
{
    public class ProductMapping
    {
        public static void CreateMap(IMapperConfigurationExpression cfg)
        {
            #region SupplierRegisterDto <=> SupplierEntity
            cfg.CreateMap<FeatureProductEntity, FeatureProductReadDto>()
               .ForMember(dest => dest.QuantityTotal, opt => opt.MapFrom(src => src.Quantity));
            cfg.CreateMap<FeatureProductReadDto, FeatureProductEntity>();
            #endregion
        }
    }
}
