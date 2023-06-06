using Abp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Shared.Entitys
{
    /// <summary>
    /// Chủ đề sản phẩm
    /// </summary>
    [Table("CategoryProduct")]
    public class CategoryProductEntity : Entity<long>
    {
        
        [Required]
        [Comment("Name Show")]
        [MaxLength(300)]
        public string Name { get; set; }
        [MaxLength(300)]
        [Required]
        public string Url { get; set; }
        public string Icon { get; set; }
        [Required]
        [MinLength(0)]
        [DefaultValue(0)]
        public int Level { get; set; }
        public long CategoryMain { get; set; }
        [Required]
        [DefaultValue(0)]
        [MinLength(0)]
        public int NumberOrder { get; set; }

        [Required]
        public long? TenantId { get; set; }

        [Required]
        public bool IsActive { get; set; }

        public DateTime? CreationTime { get; set; }

        public long? CreatorUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public long? LastModifierUserId { get; set; }
    }
}
