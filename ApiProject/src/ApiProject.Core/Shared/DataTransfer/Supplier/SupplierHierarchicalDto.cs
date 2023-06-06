using Abp.Domain.Entities;
using ApiProject.UL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.Supplier
{
    public class SupplierHierarchicalDto : Entity<long>
    {
        public SupplierHierarchical Hierarchical { get; set; }
    }
}
