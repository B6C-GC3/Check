using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;
using ApiProject.ObjectValues;
using Utils.Any;

namespace ApiProject.Shared.DataTransfer.Supplier
{
    public class SupplierRegisterDto : Entity<long>
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [RegularExpression(RegexProcess.CHECK_NUMBER_PHONE_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [MaxLength(15,ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        public string NumberPhone { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [RegularExpression(RegexProcess.CHECK_EMAIL, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        public string Email { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [RegularExpression(RegexProcess.CHECK_PASSWORD, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        public string PassWordShop { get; set; }

        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string NameShop { get; set; }

        [RegularExpression(RegexProcess.URL_NO_HTTP, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        public string LinkShop { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        public string Adress { get; set; }

        [RegularExpression(RegexProcess.URL_FULL, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        public string Url { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string CompanyVat { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public int DefaultLanguageId { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public int Status { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public int Hierarchical { get; set; }
    }
}
