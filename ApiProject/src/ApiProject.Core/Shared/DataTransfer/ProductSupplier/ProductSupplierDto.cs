using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.ProductSupplier
{
    public class ProductSupplierDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int FeatureNumber { get; set; }
        public long Trademark { get; set; }
        public string TrademarkName { get; set; }
        public double AvgStar { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}