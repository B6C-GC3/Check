using Abp.Domain.Entities;
using ApiProject.ObjectValues;
using ApiProject.UL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utils.Any;

namespace ApiProject.Shared.DataTransfer.SupplierFollow
{
    public class SupplierFollowInsertDto
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long SupplierId { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public SupplierFollowUL Status { get; set; }

        public int StarGold { get; set; }

        [MaxLength(500)]
        [MinLength(0)]
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string EvaluateUser { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool IsActive { get; set; }
    }

    public class SupplierFollowUpdateDto : Entity<long>
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long SupplierId { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public SupplierFollowUL Status { get; set; }

        public int StarGold { get; set; }

        [MaxLength(500)]
        [MinLength(0)]
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string EvaluateUser { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool IsActive { get; set; }
    }

}
