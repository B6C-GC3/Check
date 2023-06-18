using ApiProject.AttributeCustomCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Threading.Tasks;

namespace ApiProject.Web.Host.Middleware
{
    public class RedisCacheMiddleware
    {
        private readonly RequestDelegate _next;

        public RedisCacheMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            // Next HttpGet, post , put, patch, delete; call kafka and save key for FIFO
            bool isNextProcessNotReadCache = httpContext.Request.Method.Equals("POST", StringComparison.CurrentCultureIgnoreCase)
                                          || httpContext.Request.Method.Equals("PUT", StringComparison.CurrentCultureIgnoreCase)
                                          || httpContext.Request.Method.Equals("PATCH", StringComparison.CurrentCultureIgnoreCase)
                                          || httpContext.Request.Method.Equals("DELETE", StringComparison.CurrentCultureIgnoreCase);
            if (isNextProcessNotReadCache)
            {
                await _next(httpContext);
                return;
            }

            // đọc - xóa - call - kafka - ghi

            await _next(httpContext);
        }
    }
}
