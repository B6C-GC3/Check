using UnitOfWork;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Transactions;

namespace ApiProject.Web.Host.FilterAttributeCore.ActionFilters
{
    public class UnitOfWorkFilter : IActionFilter
    {

        public void OnActionExecuted(ActionExecutedContext context)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
