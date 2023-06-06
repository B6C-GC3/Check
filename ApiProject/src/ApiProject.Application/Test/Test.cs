using Abp.Application.Services;
using Abp.Runtime.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Test
{
    public interface ITest : IApplicationService
    {
        Task<string> GetProjects();
    }
    public class Test : ITest
    {
        private readonly IAbpSession _session;
        public Test(IAbpSession session)
        {
            _session = session;
        }
        public async Task<string> GetProjects()
        {
            return _session.UserId.ToString();
        }
    }
}
