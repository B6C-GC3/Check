using Abp.Application.Services;
using ApiProject.Shared.DataTransfer.DetailProduct;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.App.DetailProductAppService
{
    public interface IDetailProductApplicationService : IApplicationService
    {
        Task<DetailInfoBasicProductDto> GetDefaultProduct(long idsp);
        Task<List<ImageProductContainerDto>> GetImageProduct(long idsp);
        Task<List<FeatureProductReadDto>> GetFeatureDefault(long idsp);
    }
}
