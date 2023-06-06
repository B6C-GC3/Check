using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ApiProject.ObjectValues;
using Utils.Any;
using Abp.Domain.Entities;

namespace ApiProject.Shared.DataTransfer.CategoryProduct
{

    public class CategoryChangeNumberOrder
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long IdRoot { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long IdDestination { get; set; }
    }

    public class CategoryMainDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
    }

    public class CategoryTableDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Icon { get; set; }
        public int Level { get; set; }
        public long CategoryMainId { get; set; }
        public string CategoryMainName { get; set; }
        public int NumberOrder { get; set; }
        public long TenantId { get; set; }
        public string TenantName { get; set; }
        public bool IsActive { get; set; }
    }

    public class AdminCategoryDto : AdminCategoryCreateDto
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [MinLength(0, ErrorMessage = ERROR_DATA.MIN_LENGTH)]
        public int NumberOrder { get; set; }
    }

    public class AdminCategoryCreateDto : Entity<long>
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.SPECIAL_CHARACTERS)]
        [MaxLength(300, ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        public string Name { get; set; }

        [RegularExpression(RegexProcess.URL_SIMPLIFY, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [MaxLength(300, ErrorMessage = ERROR_DATA.MAX_LENGTH)]
        public string Url { get; set; }

        public string Icon { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        //[MinLength(0, ErrorMessage = ERROR_DATA.MIN_LENGTH)]
        public int Level { get; set; }

        public long CategoryMain { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long TenantId { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        [DefaultValue(true)]
        public bool IsActive { get; set; }
    }
}
