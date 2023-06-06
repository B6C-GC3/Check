using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Utils.Any
{
    public static class RanDomBase
    {
        private static Random random = new Random();

        public static int OnlyNumberRandom(int begin, int end)
        {
            return random.Next(begin, end);
        }

        public static string OnlyRandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            return new string(Enumerable.Range(1, length)
                   .Select(_ => chars[random.Next(chars.Length)])
                   .ToArray());
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                       .Select(s => s[random.Next(s.Length)])
                       .ToArray());
        }
    }
}
