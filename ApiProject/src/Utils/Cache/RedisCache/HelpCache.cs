using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Utils.Cache.RedisCache
{
    public static class HelpCache
    {
        private const int ABS_EXP_DEFAULT = 60;
        private const int SLD_EXP_DEFAULT = 60;

        // Hashes
        // Lists
        // Set
        // Sorted Set

        public static void Add<T>(this IDistributedCache cache, string key, T data, TimeSpan? absexp = null, TimeSpan? sldexp = null)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = absexp ?? TimeSpan.FromSeconds(ABS_EXP_DEFAULT),
                SlidingExpiration = sldexp ?? TimeSpan.FromSeconds(SLD_EXP_DEFAULT)
            };

            var jsonData = JsonConvert.SerializeObject(data);
            cache.SetString(key, jsonData, options);
        }

        public static async Task AddAsync<T>(this IDistributedCache cache, string key, T data, TimeSpan? absexp = null, TimeSpan? sldexp = null)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = absexp ?? TimeSpan.FromSeconds(ABS_EXP_DEFAULT),
                SlidingExpiration = sldexp ?? TimeSpan.FromSeconds(SLD_EXP_DEFAULT)
            };

            var jsonData = JsonConvert.SerializeObject(data);
            await cache.SetStringAsync(key, jsonData, options);
        }

        public static void Remove(this IDistributedCache cache, string key)
        {
            cache.Remove(key);
        }

        public static async Task RemoveAsync(this IDistributedCache cache, string key)
        {
            await cache.RemoveAsync(key);
        }

        public static T GetAll<T>(this IDistributedCache cache, string key)
        {
            var str = cache.GetString(key);
            return JsonConvert.DeserializeObject<T>(str);
        }

        public static async Task<T> GetAllAsync<T>(this IDistributedCache cache, string key)
        {
            var str = await cache.GetStringAsync(key);
            return JsonConvert.DeserializeObject<T>(str);
        }
    }
}
