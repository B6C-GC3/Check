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
    /// Lưu địa chỉ user,supplier .... hệ thống.
    /// </summary>
    [Table("Address")]
    public class AddressEntity : Entity<long>
    {
        /// <summary>
        /// Giới hạn phân vùng địa chỉ, Quốc gia, Tỉnh - thành phố, Huyện - Quận, Xã - Phường.... 
        /// </summary>
        [Comment("Giới hạn phân vùng địa chỉ")]
        public string Limit { get; set; }

        /// <summary>
        /// Mã đơn vị tính cho phân vùng : "Thành phố" là một đơn vị
        /// </summary>
        [Comment("Mã đơn vị tính cho phân vùng")]
        public string CodeUnit { get; set; }

        [Comment("Múi giờ")]
        public string TimeZone {get;set;}

        [Comment("bản ghi này trực thuộc cấp độ cha")]
        public long Parent { get; set; }

        [Required]
        [Comment("Đơn vị này do hệ thống liệt kê")]
        public bool IsRoot { get; set; }

        /// <summary>
        /// Nếu IsRoot = true => tên thông thường
        /// <br/>
        /// Nếu IsRoot = false => công thức : #Id => VD: #1134#2567#6784
        /// </summary>
        [Required]
        [Comment("Tên địa phương")]
        public string Name { get; set; }

        [Comment("Tọa độ google map")]
        public string Coordinates { get; set; }

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
