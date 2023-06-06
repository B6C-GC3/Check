using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Authorization
{
    public class SupplierConfigGlobal : ISupplierConfigGlobal
    {
        private long supplierId;

        public long SupplierId { get => supplierId; set => SetSupplierId(); }

        public void SetSupplierId()
        {
            supplierId = 3;
        }
    }
}
