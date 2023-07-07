using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Authorization
{
    public interface ISupplierSession
    {
        long? Id { get; }
        void Use(long? supplierId);
    }

    public class SupplierSession : ISupplierSession
    {
        private long? _supplierId;

        public long? Id { get => _supplierId; }

        public void Use(long? supplierId)
        {
            if (supplierId is null)
            {
                _supplierId = DefaultSupplierValue();
            }
            else
            {
                _supplierId = supplierId;
            }
        }

        private static long? DefaultSupplierValue()
        {
            return 1;
        }
    }
}
