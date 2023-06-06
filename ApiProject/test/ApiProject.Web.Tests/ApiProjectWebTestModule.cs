using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ApiProject.EntityFrameworkCore;
using ApiProject.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace ApiProject.Web.Tests
{
    [DependsOn(
        typeof(ApiProjectWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class ApiProjectWebTestModule : AbpModule
    {
        public ApiProjectWebTestModule(ApiProjectEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ApiProjectWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(ApiProjectWebMvcModule).Assembly);
        }
    }
}