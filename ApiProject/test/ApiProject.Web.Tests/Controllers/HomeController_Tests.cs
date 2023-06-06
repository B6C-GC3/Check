using System.Threading.Tasks;
using ApiProject.Models.TokenAuth;
using ApiProject.Web.Controllers;
using Shouldly;
using Xunit;

namespace ApiProject.Web.Tests.Controllers
{
    public class HomeController_Tests: ApiProjectWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}