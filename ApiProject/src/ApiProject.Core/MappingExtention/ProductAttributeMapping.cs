using ApiProject.Shared.DataTransfer.ProductAttribute;
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
    public class ProductAttributeMapping
    {
        public static void CreateMap(IMapperConfigurationExpression cfg)
        {
            #region SupplierRegisterDto <=> SupplierEntity
            cfg.CreateMap<ProductAttributeDetailDto, AttributeEntity>();
            cfg.CreateMap<AttributeEntity, ProductAttributeDetailDto>();
            #endregion
        }
    }
}