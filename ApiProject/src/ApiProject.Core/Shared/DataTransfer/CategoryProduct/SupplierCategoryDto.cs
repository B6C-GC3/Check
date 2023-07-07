using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.CategoryProduct
{
    public class SupplierCategorAddProductDto : Entity<long>
    {
        public string Name { get; set; }
    }

    public class SupplierCategoryDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long CategoryMain { get; set; }
    }

    public class CategorySupplierMappingDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public long CategoryMain { get; set; }
        public string CategoryMainName { get; set; }
        public bool IsActived { get; set; }
        public long UserEdit { get; set; }
        public string UserName { get; set; }
    }
}
