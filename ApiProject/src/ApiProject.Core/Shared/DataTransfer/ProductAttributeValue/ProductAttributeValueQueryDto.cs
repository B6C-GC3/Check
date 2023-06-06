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

namespace ApiProject.Shared.DataTransfer.ProductAttributeValue
{
    public class ProductAttributeValueAdminInsertDto
    {
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string Values { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long AttributeId { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool IsActive { get; set; }
    }

    public class ProductAttributeValueInsertDto
    {
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string Values { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long AttributeId { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool IsActive { get; set; }
    }

    public class ProductAttributeValueInsertSupplierDto : Entity<long>
    {
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string Name { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public List<long> CategoryProductId { get; set; }

        public string Key { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public AttributeUL Types { get; set; }
    }

    public class ProductAttributeValueAddBySuppllier
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long IdAttribute { get; set; }

        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string Value { get; set; }
    }

    public class SupplierAddAttributteWhenAddProduct
    {
        [RegularExpression(RegexProcess.NAME_VN, ErrorMessage = ERROR_DATA.WRONG_FORMAT)]
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string Values { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long CategoryId { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public AttributeUL TypesAttribute { get; set; }
    }

    public class ProductAttributeValueUpdateDto : Entity<long>
    {
    }
}
