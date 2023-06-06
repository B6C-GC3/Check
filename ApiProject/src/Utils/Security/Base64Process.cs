using System;
using System.Collections.Generic;
using System.Text;

namespace Utils.Security
{
    public static class Base64Process
    {
        public static byte[] ToByteArray(this string value) =>
              Convert.FromBase64String(value);
    }
}
