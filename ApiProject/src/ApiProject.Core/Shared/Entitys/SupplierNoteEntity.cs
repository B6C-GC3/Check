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
    /// Ghi chú cho nhà cung cấp
    /// </summary>
    [Table("SupplierNote")]
    public class SupplierNoteEntity : Entity<long>
    {
        [Required]
        public long SupplierId { get; set; }

        [Required]
        public string Content { get; set; }

        // phạm vi hoạt động
        [Required]
        public bool IsLimit { get; set; }

        public string UserEndpoint { get; set; }

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
