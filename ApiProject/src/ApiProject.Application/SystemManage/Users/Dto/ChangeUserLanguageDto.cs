using System.ComponentModel.DataAnnotations;

namespace ApiProject.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}