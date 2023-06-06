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
    /// Nhân viên của store nhà cung cấp
    /// </summary>
    [Table("SupplierMapping")]
    public class SupplierMappingEntity : Entity<long>
    {
        [Required]
        public long SupplierId { get; set; }

        [Required]
        public long UserAccountId { get; set; }

        [Required]
        [MaxLength(5)]
        public int Hierarchical { get; set; }

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
