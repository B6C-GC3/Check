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
    /// Kết nối dữ liệu dữ giữa product và attribute value (có thể dùng cho nhiều product)
    /// </summary>
    [Table("ProductMappingAttributeValue")]
    public class ProductMappingAttributeValueEntity : Entity<long>
    {
        [Required]
        public long AttributeValueId { get; set; }

        [Required]
        public long ProductId { get; set; }

        public long ProductName { get; set; }
        
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
