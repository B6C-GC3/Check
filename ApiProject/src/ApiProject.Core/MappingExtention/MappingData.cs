using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.MappingExtention
{
    public static class MappingData
    {
        public static IMapper InitializeAutomapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                SupplierMaping.CreateMap(cfg);
                ProductAttributeMapping.CreateMap(cfg);
                ProductMapping.CreateMap(cfg);
            });

            var mapper = config.CreateMapper();
            return mapper;
        }
    }
}
