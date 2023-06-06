using Abp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
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
    /// Giá trị thuộc tính của sản phẩm
    /// </summary>
    [Table("ProductAttributeValue")]
    public class ProductAttributeValueEntity : Entity<long>
    {
        [Comment("Mã thuộc tính")]
        [Required]
        public long AttributeId { get; set; }

        [Comment("Giá trị thuộc tính")]
        [Required]
        public string Values { get; set; }

        [Comment("Thuộc tính do nhà cung cấp thêm mới")]
        public long? SupplierId { get; set; }

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
