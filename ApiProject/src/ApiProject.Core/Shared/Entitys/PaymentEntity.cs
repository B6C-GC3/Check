using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.Entitys
{
    [Table("Payment")]
    public class PaymentEntity : Entity<long>
    {
        public string Type { get; set; }
        public int Status { get; set; }
        public string Content { get; set; }
        public string Currency { get; set; }
        public string Amount { get; set; }
        public string Language { get; set; }
        public string MerchantId { get; set; }
        public string BankCode { get; set; }
        public string IpAddress { get; set; }
        public string Location { get; set; }

        /* ---------------------------------------------------------*/

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        public DateTime? CreationTime { get; set; }

        public long? CreatorUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public long? LastModifierUserId { get; set; }
    }
}
