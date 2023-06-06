using Abp.Domain.Entities;
using ApiProject.ObjectValues;
using ApiProject.UL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.ProductAttributeValue
{
    public class ProductAttributeValueOtherDto
    {

    }

    public class LoadValueByProductAttributeIdIdRes : Entity<long>
    {
        public string Values { get; set; }
    }

    public class ProductAttributeValueCategoryContainer
    {
        public long? IdCategory { get; set; }
        public long? IdAttribute { get; set; }
        public long? IdAttributeValue { get; set; }
    }

    public class ProductAttributeValueSupplier
    {
        public long Id { get; set; }
        // attribute
        public long AttributeId { get; set; }

        public string NameAttribute { get; set; }

        public AttributeUL TypesAttribute { get; set; }

        // category
        public string CategoryName { get; set; }

        public long CategoryId { get; set; }

        // value
        public string Value { get; set; }

        public bool IsActive { get; set; }

        public bool IsDelete { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public long? LastModifierUserId { get; set; }
        // product
        public int ProductCount { get; set; }
        // account
        public string LastModifierUserName { get; set; }
    }
}
