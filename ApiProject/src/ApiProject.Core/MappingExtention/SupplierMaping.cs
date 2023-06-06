using ApiProject.Shared.DataTransfer.StaffSupplier;
using ApiProject.Shared.DataTransfer.Supplier;
using ApiProject.Shared.Entitys;
using AutoMapper;

namespace ApiProject.MappingExtention
{
    public class SupplierMaping
    {
        public static void CreateMap(IMapperConfigurationExpression cfg)
        {
            #region SupplierRegisterDto <=> SupplierEntity
            cfg.CreateMap<SupplierRegisterDto, SupplierEntity>();
            cfg.CreateMap<SupplierEntity, SupplierRegisterDto>();
            #endregion

            #region SupplierInfoDto <=> SupplierEntity
            cfg.CreateMap<SupplierInfoDto, SupplierEntity>();
            cfg.CreateMap<SupplierEntity, SupplierInfoDto>();
            #endregion

            #region StaffSupplierDto <=> SupplierMappingEntity
            cfg.CreateMap<StaffSupplierDto, SupplierMappingEntity>();
            cfg.CreateMap<SupplierMappingEntity, StaffSupplierDto>();
            #endregion
        }
    }
}
