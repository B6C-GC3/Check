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
    /// SEO cho FE
    /// </summary>
    [Table("Seo")]
    public class SeoEntity : Entity<long>
    {
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public string MetaKeywords { get; set; }
        public string MetaRobots { get; set; }
        public string MetaRevisit_After { get; set; }
        public string MetaContent_Language { get; set; }
        public string MetaContent_Type { get; set; }
        public string MetaProperty { get; set; }
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
