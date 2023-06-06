using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ApiProject.Configuration;

namespace ApiProject.Web.Host.Startup
{
    [DependsOn(
       typeof(ApiProjectWebCoreModule))]
    public class ApiProjectWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ApiProjectWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ApiProjectWebHostModule).GetAssembly());
        }
    }
}
