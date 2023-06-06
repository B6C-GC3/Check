using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using static ApiProject.Web.Host.FilterAttributeCore.ActionFilters.GateActionFilter;

namespace ApiProject.Web.Host.FilterAttributeCore.ActionFilters
{
    public class ModelValidationFilterAttribute : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.ModelState.ErrorCount > 0)
            {
                var responsesResource = new ResponsesResource
                {
                    ErrorCode = "400",
                    Error = true,
                    MessageError = new UnprocessableEntityObjectResult(context.ModelState).Value,
                    Result = null
                };

                context.Result = new ObjectResult(responsesResource);
                return;
            }
        }
    }

}
