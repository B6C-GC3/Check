using Abp.Domain.Entities;
using ApiProject.ObjectValues;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utils.Any;

namespace ApiProject.Shared.DataTransfer.User
{
    public class UserTenantInsertUpdateDto
    {
        public int TenantId { get; set; }
        public List<int> RoleIds { get; set; }
        public UserTenantDto User { get; set; }
    }

    public class UserTenantDto
    {
        [Required]
        [RegularExpression(RegexProcess.USERNAME, ErrorMessage = ERROR_DATA.ACCOUNT_PASSS_SPECIAL_CHARACTERS)]
        [MaxLength(250, ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        public string UserName { get; set; }
        [Required]
        [RegularExpression(RegexProcess.CHECK_EMAIL, ErrorMessage = ERROR_DATA.EMAIL_WRONG_FORMAT)]
        [MaxLength(120, ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        public string Email { get; set; }
        [Required]
        [RegularExpression(RegexProcess.NUMBER_PHONE, ErrorMessage = ERROR_DATA.NUMBERPHONE_WRONG_FORMAT)]
        public string Phone { get; set; }
        [Required]
        [RegularExpression(RegexProcess.CHECK_PASSWORD, ErrorMessage = ERROR_DATA.ACCOUNT_PASSS_SPECIAL_CHARACTERS)]
        [MaxLength(80, ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        public string Password { get; set; }
    }

    public class UserTenantReviewDto
    {
        public long Id { get; set; }
        public DateTime CreationTime { get; set; }
        public long CreatorUserId { get; set; }
        public string CreatorUserName { get; set; }
        public DateTime LastModificationTime { get; set; }
        public long LastModifierUserId { get; set; }
        public string LastModifierUserName { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string EmailConfirmationCode { get; set; }
        public DateTime LockoutEndDateUtc { get; set; }
        public int AccessFailedCount { get; set; }
        public bool IsLockoutEnabled { get; set; }
        public string Phone { get; set; }
        public bool IsPhoneNumberConfirmed { get; set; }
        public bool IsTwoFactorEnabled { get; set; }
        public bool IsEmailConfirmed { get; set; }
        public bool IsActive { get; set; }
        public List<int> RoleIds { get; set; }
    }
}
