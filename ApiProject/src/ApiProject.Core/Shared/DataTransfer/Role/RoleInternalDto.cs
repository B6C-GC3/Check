using ApiProject.ObjectValues;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utils.Any;

namespace ApiProject.Shared.DataTransfer.Role
{
    public class RoleInternalInsertDto
    {

    }

    public class RoleInternalDetailDto : RoleInternalReadDto
    {

    }

    public class RoleInternalReadDto
    {
        public int Id { get; set; }
        public string DisplayName { get; set; }
        public bool IsDefault { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsStatic { get; set; }
        public string Description { get; set; }

        public string Name { get; set; }
        public Int64 TenantId { get; set; }
        public string TenantName { get; set; }
        public DateTime LastModificationTime { get; set; }
        public Int64 LastModifierUserId { get; set; }
        public string LastModifierUserName { get; set; }
    }

    public class RoleInternalBasicDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.SPECIAL_CHARACTERS)]
        [MaxLength(64, ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        public string DisplayName { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool IsDefault { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool IsDeleted { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool IsStatic { get; set; }

        [MaxLength(5000, ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.SPECIAL_CHARACTERS)]
        public string Description { get; set; }
    }
}
