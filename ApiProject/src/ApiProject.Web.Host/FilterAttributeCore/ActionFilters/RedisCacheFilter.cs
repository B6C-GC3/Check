using DocumentFormat.OpenXml.InkML;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Text.RegularExpressions;
using Utils.Aggregate;
using Utils.Cache.RedisCache;

namespace ApiProject.Web.Host.FilterAttributeCore.ActionFilters
{
    public class RedisCacheFilter : Attribute, IActionFilter
    {
        private readonly IDistributedCache cache;
        public RedisCacheFilter()
        {
            cache = (IDistributedCache)StaticServiceProvider.Provider.GetService(typeof(IDistributedCache));
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Result is ObjectResult objectResult)
            {
                string key = Regex.Replace(context.HttpContext.Request.Path.ToString().Replace("/api/services/app/", ""),
                                           @"[/\\]",
                                           "_",
                                           RegexOptions.CultureInvariant)
                             + context.HttpContext.Request.QueryString;

                cache.Add(key, objectResult.Value);
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
