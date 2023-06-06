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
    /// Cấu hình Trang hiển thị cho nhà cung cấp
    /// </summary>
    [Table("StoreSupplier")]
    public class StoreSupplierEntity : Entity<long>
    {
        public string Logo { get; set; }

        public string Background { get; set; }

        public string Descrpition { get; set; }

        [Required]
        public int Follow { get; set; }

        [Required]
        public long SupplierId { get; set; }

        [Required]
        public long SeoId { get; set; }

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
