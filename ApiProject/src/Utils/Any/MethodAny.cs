using System;
using System.Collections.Generic;
using System.Text;

namespace Utils.Any
{
    public static class MethodAny
    {
        public const string HTTP_GET = "GET";
        public const string HTTP_HEAD = "HEAD";
        public const string HTTP_POST = "POST";
        public const string HTTP_PUT = "PUT";
        public const string HTTP_DELETE = "DELETE";
        public const string HTTP_OPTIONS = "OPTIONS";
        public const string HTTP_PATCH = "PATCH";

        public static bool GET_HTTP_FOR_CACHE(string method)
        {
            return method.ToUpper() switch
            {
                HTTP_GET => true,
                HTTP_HEAD => true,
                HTTP_POST => false,
                HTTP_PUT => false,
                HTTP_DELETE => false,
                HTTP_OPTIONS => false,
                HTTP_PATCH => false,
                _ => false
            };
        }
    }
}
