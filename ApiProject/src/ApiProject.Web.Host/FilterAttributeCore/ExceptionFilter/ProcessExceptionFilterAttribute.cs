using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace ApiProject.Web.Host.FilterAttributeCore.ExceptionFilter
{
    public class ProcessExceptionFilterAttribute : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            //ILogTextLog4Net iLog = context.HttpContext.RequestServices.GetService(typeof(ILogTextLog4Net)) as ILogTextLog4Net;
            context.ExceptionHandled = true;
            HttpResponse response = context.HttpContext.Response;
            if (context.Exception is Utils.Exceptions.ClientException ce)
            {

                if (ce.errorCode > 300)
                {
                    response.StatusCode = 200;
                }
                else
                {
                    response.StatusCode = ce.errorCode;
                }

                //context.Result = response.StatusCode switch
                //{
                //    400 => new ObjectResult(context.Exception.Message),
                //    401 => new ObjectResult(context.Exception.Message),
                //    403 => new ObjectResult("The client is rejected because the server is overloaded!"),
                //    405 => new ObjectResult("Client does not have access to this URL!"),
                //    410 => new ObjectResult("Resource no longer exists!"),
                //    415 => new ObjectResult(context.Exception.Message),
                //    422 => new ObjectResult(context.Exception.Message),
                //    429 => new ObjectResult("Request denied due to restriction!"),
                //    // lỗi 404 Không tìm thấy đường dẫn
                //    _ => new ObjectResult(context.Exception.Message)
                //};
            }
            //// Lỗi phát sinh từ phía database do kiểu dữ liệu hoặc UNIQUE hoặc primary key .....
            //else if (context.Exception is UnitOfWork.ClientExceptionDatabase cedb)
            //{
            //    response.StatusCode = cedb.errorCode;
            //    context.Result = response.StatusCode switch
            //    {
            //        400 => new ObjectResult(context.Exception.Message),
            //        401 => new ObjectResult(context.Exception.Message),
            //        403 => new ObjectResult("The client is rejected because the server is overloaded!"),
            //        405 => new ObjectResult("Client does not have access to this URL!"),
            //        410 => new ObjectResult("Resource no longer exists!"),
            //        415 => new ObjectResult(context.Exception.Message),
            //        422 => new ObjectResult(context.Exception.Message),
            //        429 => new ObjectResult("Request denied due to restriction!"),
            //        //lỗi 404 Không tìm thấy đường dẫn

            //       _ => new ObjectResult(context.Exception.Message),
            //    };
            //}
            else
            {
                // Error không xác định 
                response.StatusCode = 500;
                context.Result = new ObjectResult(context.Exception.Message + "\n" + context.Exception.StackTrace);
                //iLog.LogError(context.Exception.Message, context.Exception);
                //SaveErrorToDatabase("Server error occurred.", response.StatusCode, context);
            }
            response.ContentType = "application/json";
        }
        //private void SaveErrorToDatabase(string message, int statusCode, ExceptionContext context)
        //{
        //    InfomationError infomationError = new InfomationError
        //    {
        //        Exception = context.Exception,
        //        ServerError = "Login API",
        //        AccountCreate = 1,
        //        IpAccount = context.HttpContext.Connection.RemoteIpAddress.ToString(),
        //        Level = "Error : " + statusCode.ToString()
        //    };
        //    _logger.LogError(infomationError);
        //    context.Result = new ObjectResult(message);
        //}
    }
}
