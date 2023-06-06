using System;
using System.Collections.Generic;
using System.Text;

namespace Utils.Cache
{
    public interface ICacheBase
    {
        T Get<T>(string key);
        void Add<T>(T o, string key);
        void Remove(string key);
    }
}
