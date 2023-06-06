using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace ApiProject.Authorization
{
    public class ApiProjectAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages);
            context.CreatePermission(PermissionNames.Pages_Tenants, multiTenancySides: MultiTenancySides.Host);
            context.CreatePermission(PermissionNames.Pages_Admins);           
            context.CreatePermission(PermissionNames.Pages_Supplier);           
            context.CreatePermission(PermissionNames.Pages_Custommer);           
            context.CreatePermission(PermissionNames.Pages_Anonymous);
            context.CreatePermission(PermissionNames.Pages_Ship);
            context.CreatePermission(PermissionNames.Pages_Users);
            context.CreatePermission(PermissionNames.Pages_Users_Activation);
            context.CreatePermission(PermissionNames.Pages_Roles);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, ApiProjectConsts.LocalizationSourceName);
        }
    }
}
