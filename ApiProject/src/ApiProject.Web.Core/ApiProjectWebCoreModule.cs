using System;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.SignalR;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.Configuration;
using ApiProject.Authentication.JwtBearer;
using ApiProject.Configuration;
using ApiProject.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace ApiProject
{
    [DependsOn(
         typeof(ApiProjectApplicationModule),
         typeof(ApiProjectEntityFrameworkModule),
         typeof(AbpAspNetCoreModule)
        , typeof(AbpAspNetCoreSignalRModule)
     )]
    public class ApiProjectWebCoreModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public ApiProjectWebCoreModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.Modules.AbpAspNetCore().DefaultWrapResultAttribute.WrapOnError = false;
            Configuration.Modules.AbpAspNetCore().DefaultWrapResultAttribute.WrapOnSuccess = false;
            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;

            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                ApiProjectConsts.ConnectionStringName
            );

            // Use database for language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            Configuration.Modules.AbpAspNetCore()
                 .CreateControllersForAppServices(
                     typeof(ApiProjectApplicationModule).GetAssembly()
                 );

            ConfigureTokenAuth();
        }

        private void ConfigureTokenAuth()
        {
            IocManager.Register<TokenAuthConfiguration>();
            var tokenAuthConfig = IocManager.Resolve<TokenAuthConfiguration>();

            tokenAuthConfig.SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appConfiguration["Authentication:JwtBearer:SecurityKey"]));
            tokenAuthConfig.Issuer = _appConfiguration["Authentication:JwtBearer:Issuer"];
            tokenAuthConfig.Audience = _appConfiguration["Authentication:JwtBearer:Audience"];
            tokenAuthConfig.SigningCredentials = new SigningCredentials(tokenAuthConfig.SecurityKey, SecurityAlgorithms.HmacSha256);
            tokenAuthConfig.Expiration = TimeSpan.FromDays(1);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ApiProjectWebCoreModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(ApiProjectWebCoreModule).Assembly);
        }
    }
}
