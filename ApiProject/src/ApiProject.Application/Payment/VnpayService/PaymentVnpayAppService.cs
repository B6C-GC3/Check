using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Payment.VnpayService
{
    public interface IPaymentVnpayAppService : IApplicationService
    {
        Task<string> GetRequest();
    }

    public class PaymentVnpayAppService : IPaymentVnpayAppService
    {
        public Task<string> GetRequest()
        {
            throw new NotImplementedException();
        }
    }
}
