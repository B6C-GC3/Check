using ApiProject.Roles.RoleInternal;
using ApiProject.Shared.DataTransfer.Role;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utils.Exceptions;
using Xunit;
using Xunit.Abstractions;

namespace ApiProject.Tests.RoleTest
{
    /// <summary>[vi] Create By : Trần Hữu Hải Nam</summary>
    public class RoleAppService_Tests : ApiProjectTestBase
    {
        private readonly ITestOutputHelper output;

        private readonly IRoleInternalAppService _role;

        public RoleAppService_Tests(ITestOutputHelper output)
        {
            this.output = output;
            _role = Resolve<IRoleInternalAppService>();
        }

        public static IEnumerable<RoleInternalBasicDto> UpdateCaseforRoleInternalTestCases
        {
            get
            {
                // update mới không trùng lặp
                yield return new RoleInternalBasicDto()
                { Id = 8, DisplayName = "Trần Hải Nam2", IsDefault = false, IsDeleted = false, IsStatic = true, Description = "Trần Hải Nam2" };
                // có tồn tại default
                yield return new RoleInternalBasicDto()
                { Id = 8, DisplayName = "Trần Hải Nam3", IsDefault = true, IsDeleted = false, IsStatic = false, Description = "Trần Hải Nam3" };
                // có tồn tại static
                yield return new RoleInternalBasicDto()
                { Id = 8, DisplayName = "Trần Hải Nam2", IsDefault = false, IsDeleted = false, IsStatic = true, Description = "Trần Hải Nam2" };
                // có tồn tại name
                yield return new RoleInternalBasicDto()
                { Id = 8, DisplayName = "Trần Hải Nam2", IsDefault = false, IsDeleted = false, IsStatic = false, Description = "Trần Hải Nam2" };
                // không tồn tại id
                yield return new RoleInternalBasicDto()
                { Id = 10, DisplayName = "Trần Hải Nam2", IsDefault = false, IsDeleted = false, IsStatic = false, Description = "Trần Hải Nam2" };
                // tên không hợp lệ
                yield return new RoleInternalBasicDto()
                { Id = 8, DisplayName = "Trần Hải Nam2@#", IsDefault = false, IsDeleted = false, IsStatic = false, Description = "Trần Hải Nam2" };
                // description không hợp lệ
                yield return new RoleInternalBasicDto()
                { Id = 8, DisplayName = "Trần Hải Nam2", IsDefault = false, IsDeleted = false, IsStatic = false, Description = "Trần Hải Nam2@3" };
                // tài khoản trùng tên admin
                yield return new RoleInternalBasicDto()
                { Id = 8, DisplayName = "admin", IsDefault = false, IsDeleted = false, IsStatic = false, Description = "admin" };
            }
        }

        //[Test] //NUnit
        //[TestCaseSource(nameof(UpdateCaseforRoleInternalTestCases))] //NUnit
        //[Theory] //XUnit
        //[ClassData(typeof(CarClassData))] //XUnit
        [Fact]  //XUnit
        public async Task UpdateRole_By_Id_Check_Default_Delete_Static_DisplayName_Test()
        {
            //Arrange
            foreach (var role in UpdateCaseforRoleInternalTestCases)
            {
                output.WriteLine("Data: {0}  ", JsonConvert.SerializeObject(role));
                try
                {
                    // Act
                    var result = await _role.UpdateRoleBasic(role);
                    //Assert
                    output.WriteLine("Result: {0}  ", result);
                }
                catch (Exception ex)
                {
                    //Assert
                    output.WriteLine("Error: {0}", ex.Message);
                }
            }
        }
    }
}
