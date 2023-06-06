using Abp.Domain.Entities;
using ApiProject.UL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.Supplier
{
    public class SupplierChangeStatus : Entity<long>
    {
        public STATUS_SUPPLIER_MAPPING Status { get; set; }
    }
}
