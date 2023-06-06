using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;

namespace ApiProject.Shared.Entitys
{
    /// <summary>
    /// Giá trị thuộc tính riêng nhà cung cấp
    /// </summary>
    [Table("SupplierAttributeValue")]
    public class SupplierAttributeValueEntity : Entity<long>
    {
        [Required]
        public long SupplierId { get; set; }

        [Required]
        public long SupplierAttributeId { get; set; }

        [Required]
        public string Value { get; set; }

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
