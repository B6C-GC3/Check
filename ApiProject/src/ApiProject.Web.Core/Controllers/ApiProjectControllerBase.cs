using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ApiProject.Controllers
{
    public abstract class ApiProjectControllerBase: AbpController
    {
        protected ApiProjectControllerBase()
        {
            LocalizationSourceName = ApiProjectConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
