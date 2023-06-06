using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shouldly;
using Xunit;
using Abp.Application.Services.Dto;
using ApiProject.Users;
using ApiProject.Users.Dto;
using Xunit.Abstractions;

namespace ApiProject.Tests.Users
{
    public class UserAppService_Tests : ApiProjectTestBase
    {
        private readonly IUserAppService _userAppService;
        private readonly ITestOutputHelper output;
        public UserAppService_Tests(ITestOutputHelper output)
        {
            _userAppService = Resolve<IUserAppService>();
            this.output = output;
        }

        [Fact]
        public async Task GetUsers_Test()
        {
            // Act
            var output = await _userAppService.GetAllAsync(new PagedUserResultRequestDto{MaxResultCount=20, SkipCount=0} );

            // Assert
            output.Items.Count.ShouldBeGreaterThan(0);
        }

        [Fact]
        public async Task CreateUser_Test()
        {
            // Act
            await _userAppService.CreateAsync(
                new CreateUserDto
                {
                    EmailAddress = "john@volosoft.com",
                    IsActive = true,
                    Name = "John",
                    Surname = "Nash",
                    Password = "123qwe",
                    UserName = "john.nash"
                });

            await UsingDbContextAsync(async context =>
            {
                var johnNashUser = await context.Users.FirstOrDefaultAsync(u => u.UserName == "john.nash");
                johnNashUser.ShouldNotBeNull();
                output.WriteLine("dada");
            });
        }
    }
}
