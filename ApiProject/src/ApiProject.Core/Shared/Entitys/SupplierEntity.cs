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
    /// <summary>
    /// Thông tin cơ bản nhà cung cấp
    /// </summary>
    [Table("Supplier")]
    public class SupplierEntity : Entity<long>
    {

        [Required]
        [MaxLength(15)]
        public string NumberPhone { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PassWordShop { get; set; }

        [Required]
        public string HaskPass { get; set; }

        [Required]
        public string NameShop { get; set; }

        public string LinkShop { get; set; }

        [Required]
        public string Adress { get; set; }

        public string Url { get; set; }

        public string Hosts { get; set; }

        [Required]
        public string CompanyVat { get; set; }

        public bool SslEnabled { get; set; }

        [Required]
        public int DefaultLanguageId { get; set; }

        [Required]
        public int DisplayOrder { get; set; }

        [Required]
        public int Status { get; set; }

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
