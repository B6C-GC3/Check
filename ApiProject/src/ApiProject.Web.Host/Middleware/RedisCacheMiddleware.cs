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
            // đọc - xóa - call - kafka - ghi

            await _next(httpContext);
        }
    }
}
