using UnitOfWork;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Builder;
using ApiProject.AttributeCustomCore;
using DocumentFormat.OpenXml.InkML;

namespace ApiProject.Web.Host.Middleware
{
    public class DbTransactionMiddleware
    {
        private readonly RequestDelegate _next;

        public DbTransactionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext, IUnitOfWork connectionProvider)
        {
            // Next HttpGet
            if (httpContext.Request.Method.Equals("GET", StringComparison.CurrentCultureIgnoreCase))
            {
                await _next(httpContext);
                return;
            }
            // Next Func no tag [Transaction]
            var endpoint = httpContext.Features.Get<IEndpointFeature>()?.Endpoint;
            var attribute = endpoint?.Metadata.GetMetadata<TransactionAttribute>();
            if (attribute == null)
            {
                await _next(httpContext);
                return;
            }

            // Open Transaction and follow
            IDbContextTransaction transaction = connectionProvider.BeginTransaction();
            await _next(httpContext);
        }
    }

    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseDbTransaction(this IApplicationBuilder app)
            => app.UseMiddleware<DbTransactionMiddleware>();
    }
}
