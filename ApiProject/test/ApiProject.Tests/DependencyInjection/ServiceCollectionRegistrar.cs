using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Castle.MicroKernel.Registration;
using Castle.Windsor.MsDependencyInjection;
using Abp.Dependency;
using ApiProject.EntityFrameworkCore;
using ApiProject.Identity;
using Microsoft.Extensions.Configuration;
using UnitOfWork;
using Microsoft.AspNetCore.Hosting;

namespace ApiProject.Tests.DependencyInjection
{
    public static class ServiceCollectionRegistrar
    {
        public static void Register(IIocManager iocManager)
        {
            var services = new ServiceCollection();
            services.AddDbContext<ApiProjectDbContext>(opt =>
            {
                opt.UseSqlServer("Server=127.0.0.1,1433; Database=ProcessDb; User Id=sa;Password=Sa123456");
            }).AddUnitOfWork<ApiProjectDbContext>();

            IdentityRegistrar.Register(services);

            services.AddEntityFrameworkInMemoryDatabase();

            var serviceProvider = WindsorRegistrationHelper.CreateServiceProvider(iocManager.IocContainer, services);

            var builder = new DbContextOptionsBuilder<ApiProjectDbContext>();
            builder.UseInMemoryDatabase(Guid.NewGuid().ToString()).UseInternalServiceProvider(serviceProvider);

            iocManager.IocContainer.Register(
                Component
                    .For<DbContextOptions<ApiProjectDbContext>>()
                    .Instance(builder.Options)
                    .LifestyleSingleton()
            );
        }
    }
}
