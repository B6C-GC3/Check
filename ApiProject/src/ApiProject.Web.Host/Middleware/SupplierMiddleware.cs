using ApiProject.AttributeCustomCore;
using ApiProject.Authorization;
using DocumentFormat.OpenXml.InkML;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Threading.Tasks;

namespace ApiProject.Web.Host.Middleware
{
    public class SupplierMiddleware
    {
        private readonly RequestDelegate _next;

        public SupplierMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            // Next Func no tag [Supplier]
            //var endpoint = httpContext.Features.Get<IEndpointFeature>()?.Endpoint;
            //var attribute = endpoint?.Metadata.GetMetadata<SupplierAttribute>();
            //if (attribute == null)
            //{
            //    await _next(httpContext);
            //    return;
            //}
            // check quyền

            ISupplierSession supplier = httpContext.RequestServices.GetService(typeof(ISupplierSession)) as ISupplierSession;
            supplier.Use(null);

            await _next(httpContext);
        }
    }
}
