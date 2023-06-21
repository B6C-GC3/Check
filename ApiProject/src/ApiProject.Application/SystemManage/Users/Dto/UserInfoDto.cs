using ApiProject.ObjectValues;
using ApiProject.UL;
using System;
using System.ComponentModel.DataAnnotations;
using Utils.Any;

namespace ApiProject.SystemManage.Users.Dto
{
    public class UserInfoDto
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [MaxLength(300, ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        public string Name { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public UserInfoSexeUL Sexe { get; set; }

        [RegularExpression(RegexProcess.CHECK_EMAIL, ErrorMessage = ERROR_DATA.EMAIL_WRONG_FORMAT)]
        public string Email { get; set; }

        [RegularExpression(RegexProcess.CHECK_NUMBER_PHONE_VN, ErrorMessage = ERROR_DATA.EMAIL_WRONG_FORMAT)]
        public string NumberPhone { get; set; }

        public long? Nationality { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string AvatarUrl { get; set; }
        public string Nickname { get; set; }
    }

    public class UserInfoResDto
    {
        public string Name { get; set; }
        public UserInfoSexeUL Sexe { get; set; }

        public string Email { get; set; }

        public string NumberPhone { get; set; }

        public long? Nationality { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string AvatarUrl { get; set; }
        public string Nickname { get; set; }
    }
}
