using System;
using System.Collections.Generic;
using System.Text;

namespace Utils.Auth
{
    public static class TypeConverterExtension
    {
        public static byte[] ToByteArray(this string value) =>
         Convert.FromBase64String(value);
    }
}
