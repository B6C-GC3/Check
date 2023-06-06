using Abp.Application.Services;
using ApiProject.Shared.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Administrators.ProductService
{
    public interface IProductAppService : IApplicationService
    {
        Task<List<Values>> GetAlbumProductByIdSupplier();
    }
}
