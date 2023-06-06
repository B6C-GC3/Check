using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ApiProject.Authorization;

namespace ApiProject
{
    [DependsOn(
        typeof(ApiProjectCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ApiProjectApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ApiProjectAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ApiProjectApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
