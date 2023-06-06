using Abp.Domain.Entities;
using ApiProject.ObjectValues;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utils.Any;

namespace ApiProject.Shared.DataTransfer.ProductAttributeValue
{
    public class ProductAttributeValueDto
    {
    }

    public class ProductAttributeValueAdminDto : Entity<long>
    {
        public string Values { get; set; }

        public long AttributeId { get; set; }

        public string AttributeName { get; set; }

        public long CategoryProductId { get; set; }

        public string CategoryProductName { get; set; }

        public long? SupplierId { get; set; }

        public string SupplierName { get; set; }

        public bool IsActive { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public long? LastModifierUserId { get; set; }

        public string LastModifierUserName { get; set; }
    }
}
