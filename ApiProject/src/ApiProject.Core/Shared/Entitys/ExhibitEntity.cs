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
    /// Giấy tờ trong hệ thống bao gồm : Nhà cung cấp, sản phẩm  ...
    /// </summary>
    [Table("Exhibit")]
    public class ExhibitEntity : Entity<long>
    {
        // tên giấy tờ
        public string Name { get; set; }
        // kiểu tài khoản xác minh giấy tờ. người dùng, nhà cung cấp ....
        public string Type { get; set; }
        // định hướng tài khoản
        public int AccountId { get; set; }

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
