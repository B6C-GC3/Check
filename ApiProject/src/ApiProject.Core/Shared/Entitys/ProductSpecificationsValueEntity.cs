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
    /// Thuộc tính cho thông số kỹ thuật sản phẩm 
    /// </summary>
    [Table("ProductSpecificationsValue")]
    public class ProductSpecificationsValueEntity : Entity<long>
    {
        [Required]
        public long AttributeId { get; set; }

        [Required]
        public string Value { get; set; }

        [Required]
        public long ProductId { get; set; }

        [Required]
        public string Group { get; set; }

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
