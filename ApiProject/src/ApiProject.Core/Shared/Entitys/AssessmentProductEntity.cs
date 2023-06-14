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
    [Table("AssessmentProduct")]
    public class AssessmentProductEntity : Entity<long>
    {
        public string Comment { get; set; }
        public int? Star { get; set; }
        public string? Feel { get; set; }

        public long? AttributeIdOne { get; set; }
        public long? AttributeIdTwo { get; set; }
        public long? AttributeIdThree { get; set; }

        public long? AttributeValueOne { get; set; }
        public long? AttributeValueTwo { get; set; }
        public long? AttributeValueThree { get; set; }

        public long? AssessmentProductId { get; set; }
        public int Level { get; set; }

        public bool IsNew { get; set; }

        public long? AssessmentId { get; set; }

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
