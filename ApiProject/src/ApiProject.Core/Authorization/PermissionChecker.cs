using Abp.Authorization;
using ApiProject.Authorization.Roles;
using ApiProject.Authorization.Users;

namespace ApiProject.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
