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

namespace ApiProject.Shared.DataTransfer.ProductAttribute
{
    public class ProductAttributeInsertDto
    {
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string Name { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public AttributeUL Types { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long CategoryProductId { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool IsActive { get; set; }

    }

    public class ProductAttributeUpdateDto : Entity<long>
    {
        public string Name { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public AttributeUL Types { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long CategoryProductId { get; set; }

        public bool IsActive { get; set; }
    }
}