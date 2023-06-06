using System;
using System.ComponentModel.DataAnnotations;
using Utils.Any;
using static ApiProject.ObjectValues.ERROR_DATA;

namespace ApiProject.MultiTenancy.Dto
{
    public class TenantUpdateDto : TenantInsertDto
    {
        [Required(ErrorMessage = NOT_NULL)]
        public int Id { get; set; }
    }

    public class TenantInsertDto
    {
        [Required(ErrorMessage = NOT_NULL)]
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = SPECIAL_CHARACTERS)]
        [MaxLength(64, ErrorMessage = MAX_LENGTH)]
        public string Name { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
    }

    public class TenantBasicDto
    {
        public int Id { get; set; }
        public string TenancyName { get; set; }
        public string Name { get; set; }
        public string ConnectionString { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsActive { get; set; }
        public Int64 LastModifierUserId { get; set; }
        public string LastModifierUserName { get; set; }
        public DateTime LastModificationTime { get; set; }
    }

    public class TenantFullDto : TenantBasicDto
    {
        public int EditionId { get; set; }
        public DateTime DeletionTime { get; set; }
        public int DeleterUserId { get; set; }
        public int CreatorUserId { get; set; }
        public DateTime CreationTime { get; set; }
    }
}
