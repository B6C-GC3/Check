using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.UL
{
    public enum PaymentUL
    {
        ORDER,
        PAYMENT,
        SHIPING,
        SUCCESS,
        CANCEL
    }

    public enum PaymentTypeUL
    {
        NONE,
        VIETEL,
        MOMO,
        VNPAY,
        ZALO,
        ATM,
        CARD
    }
}
