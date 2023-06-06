using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.ProductAttribute
{
    public class ProductAttributeDto
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public int Types { get; set; }

        public long CategoryProductId { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public long? LastModifierUserId { get; set; }

        public string CategoryProductName { get; set; }

        public string LastModifierUserName { get; set; }

        public DateTime? LastModificationTime { get; set; }

    }

    public class ProductAttributeDetailDto : Entity<long>
    {
        public string Name { get; set; }

        public int Types { get; set; }

        public long CategoryProductId { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? CreationTime { get; set; }

        public long? CreatorUserId { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public long? LastModifierUserId { get; set; }
    }
}
