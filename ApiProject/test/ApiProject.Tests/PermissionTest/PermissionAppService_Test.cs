using ApiProject.PermissionService.PermissionTenant;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace ApiProject.Tests.PermissionTest
{
    public class PermissionAppService_Test : ApiProjectTestBase
    {
        private readonly ITestOutputHelper output;

        private readonly IPermissionAppService _permission;

        public PermissionAppService_Test(ITestOutputHelper output)
        {
            this.output = output;
            _permission = Resolve<IPermissionAppService>();
        }
        public static IEnumerable<string> UpdateCaseforRoleInternalTestCases
        {
            get
            {
                yield return "Page.User.Activation";
                yield return "Page.User.Read";
                yield return "Page.User.Create";
                yield return "Page.User.Update";
                yield return "Page.User.Delete";
                yield return "Page.Role.Activation";
                yield return "Page.Role.Read";
                yield return "Page.Role.Update";
                yield return "Page.Role.Delete";
            }
        }

        [Fact]  //XUnit
        public async Task UpdateRole_By_Id_Check_Default_Delete_Static_DisplayName_Test()
        {
            ////Arrange
            //try
            //{
            //    // Act
            //    var result = _permission.ProcessPermision(UpdateCaseforRoleInternalTestCases.ToList());
            //    //Assert
            //    output.WriteLine("Result: {0}  ", JsonConvert.SerializeObject(result));
            //    //Assert.True();
            //}
            //catch (Exception ex)
            //{
            //    //Assert
            //    output.WriteLine("Error: {0}", ex.Message);
            //}
        }
    }
}
