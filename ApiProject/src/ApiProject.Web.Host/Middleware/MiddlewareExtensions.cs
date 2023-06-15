using Microsoft.AspNetCore.Builder;

namespace ApiProject.Web.Host.Middleware
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseDbTransaction(this IApplicationBuilder app)
            => app.UseMiddleware<DbTransactionMiddleware>();

        public static IApplicationBuilder UseRedisCache(this IApplicationBuilder app)
               => app.UseMiddleware<RedisCacheMiddleware>();
    }

}
