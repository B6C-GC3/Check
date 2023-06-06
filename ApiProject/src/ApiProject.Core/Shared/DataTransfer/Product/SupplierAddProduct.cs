using ApiProject.ObjectValues;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ApiProject.Shared.DataTransfer.Product
{
    public class ProductAddInsertsDto
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public List<long> Categorys { get; set; }
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public ProductAddQueryDto InfoBasic { get; set; }
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public List<string> Images { get; set; }
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public List<DataTypeProductAdd> FutureProduct { get; set; }
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string TechProduct { get; set; }
        public List<string> Gift { get; set; }
        public string PostProduct { get; set; }
        public List<string> Seo { get; set; }
    }

    public class GroupSpecification
    {
        public string Key { get; set; }
        public List<ValueSpecification> Value { get; set; }
    }

    public class ValueSpecification
    {
        public long Key { get; set; }
        public string Value { get; set; }
    }

    public class ProductAddQueryDto
    {
        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string Name { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public bool Fragile { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long Trademark { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public long UnitProduct { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public int OrderMinimumQuantity { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public int OrderMaximumQuantity { get; set; }

        [Required(ErrorMessage = ERROR_DATA.NOT_NULL)]
        public string ProductAlbum { get; set; }
    }

    public class DataTypeProductAdd
    {
        public string Key { get; set; }
        public string Name { get; set; }
        public long? KeyAttributeOne { get; set; }
        public long KeyAttributeTwo { get; set; }
        public long KeyAttributeThree { get; set; }
        public long? IdKeyAttributeOne { get; set; }
        public long? IdKeyAttributeTwo { get; set; }
        public long? IdKeyAttributeThree { get; set; }
        public string Price { get; set; }
        public long Quantity { get; set; }
        public long DisplayOrder { get; set; }
        public string Avatar { get; set; }
        public bool IsActive { get; set; }
    }
}
