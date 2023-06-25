using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.AssessmentSupplier
{
    public class AssessmentSupplierOverviewDto
    {
        public int TotalStar { get; set; }
        public double AvgStar { get; set; }
        public int TotalComment { get; set; }

    }

    public class AssessmentSupplierCommentDto
    {
        public long Id { get; set; }
        public string Comment { get; set; }
        public int Star { get; set; }
        public long AssessmentProductId { get; set; }
        public string ProductName { get; set; }
        public bool IsNew { get; set; }
        public int NumberImage { get; set; }
        public long? CreatorUserId { get; set; }
        public string NameUser { get; set; }
        public DateTime LastModificationTime { get; set; }
        public bool? IsActive { get; set; }
    }
}
