using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Authorization
{
    public interface ISupplierConfigGlobal
    {
        long? SupplierId { get; }
        void Use(long? supplierId);
    }

    public class SupplierConfigGlobal : ISupplierConfigGlobal
    {
        private long? _supplierId;

        public long? SupplierId { get => _supplierId; }

        public void Use(long? supplierId)
        {
            _supplierId = supplierId;
        }
    }
}
