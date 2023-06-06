using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Text;

namespace Utils.Any
{
    public static class HttpContextGetRequest
    {
        public static string ConvertToKey(string method, string controller, string action, string parameter, string path, string host, string port)
        {
            if (!MethodAny.GET_HTTP_FOR_CACHE(method))
                return null;
            // struct Key : host.port.controller.action.method.path.parameter

            string KeyCache = String.Format("{0}.{1}.{2}.{3}.{4}.{5}.{6}", host,port,controller,action,method,path.Replace("/", "_"), parameter.Replace("?", "_").Replace("&", "-").Replace(" ", "_"));

            return KeyCache;
        }
    }
}
