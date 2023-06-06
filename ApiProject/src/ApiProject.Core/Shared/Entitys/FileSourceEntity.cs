using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProject.Shared.Entitys
{
    /// <summary>
    /// Quản lý ảnh trong hệ thống
    /// </summary>
    [Table("FileSource")]
    public class FileSourceEntity : Entity<long>
    {
        [Required]
        public string ImageName { get; set; }

        [Required]
        public string MimeType { get; set; }

        public string SeoFilename { get; set; }

        public string AltAttribute { get; set; }

        public string TitleAttribute { get; set; }

        [Required]
        public bool IsNew { get; set; }

        [Required]
        public string VirtualPath { get; set; }

        [Required]
        public string Size { get; set; }

        [Required]
        public string Folder { get; set; }

        public long? ImageRoot { get; set; }

        [Required]
        public int Types { get; set; }

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
