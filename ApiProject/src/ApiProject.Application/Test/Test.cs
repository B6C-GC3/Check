using Abp.Application.Services;
using Abp.Runtime.Session;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utils.Cache.RedisCache;

namespace ApiProject.Test
{
    public interface ITest : IApplicationService
    {
        Task<string> GetProjects();
    }

    public class Test : ITest
    {
        private readonly IAbpSession _session;
        private readonly IDistributedCache _cache;
        public Test(IAbpSession session, IDistributedCache cache)
        {
            _session = session;
            _cache = cache;
        }

        public async Task<string> GetProjects()
        {
            await _cache.AddAsync("Test", "Nam con mẹ mày");
            return _session.UserId.ToString();
        }
    }
}
