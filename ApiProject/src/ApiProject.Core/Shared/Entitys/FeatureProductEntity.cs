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
    /// Phiên bản sản phẩm, Mỗn sản phẩm sẽ có những phiên bản khác nhau
    /// </summary>
    [Table("FeatureProduct")]
    public class FeatureProductEntity:Entity<long>
    {
        [Required]
        public long ProductId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public long AttributeValueOne { get; set; }
        public long? AttributeValueTwo { get; set; }
        public long? AttributeValueThree { get; set; }
        [Required]
        public long AttributeIdOne { get; set; }
        public long? AttributeIdTwo { get; set; }
        public long? AttributeIdThree { get; set; }

        public decimal WeightAdjustment { get; set; }
        public decimal LengthAdjustment { get; set; }
        public decimal WidthAdjustment { get; set; }
        public decimal HeightAdjustment { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public int DisplayOrder { get; set; }
        [Required]
        public long PictureId { get; set; }
        [Required]
        public bool MainProduct { get; set; }

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
