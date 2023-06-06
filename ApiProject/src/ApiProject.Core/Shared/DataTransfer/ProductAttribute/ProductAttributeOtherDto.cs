using Abp.Domain.Entities;
using ApiProject.UL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.ProductAttribute
{
    public class ProductAttributeChangeTypesDto : Entity<long>
    {
        public AttributeUL Types { get; set; }
    }

    public class ProductAttributeChangeCategoryDto : Entity<long>
    {
        public long CategoryId { get; set; }
    }

    public class ProductAttributeTypeAndCategoryReq
    {
        public AttributeUL TypesAttribute { get; set; }
        public List<long> CategoryIds { get; set; }
        public string Name { get; set; }
    }

    public class ProductAttributeTypeAndCategoryRes : Entity<long>
    {
        public string Name { get; set; }
    }
}
