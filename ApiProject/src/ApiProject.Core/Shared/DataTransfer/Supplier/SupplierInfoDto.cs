using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.Supplier
{
    public class SupplierInfoDto : Entity<long>
    {
        public string NumberPhone { get; set; }

        public string Email { get; set; }

        public string NameShop { get; set; }

        public string LinkShop { get; set; }

        public string Adress { get; set; }

        public string Url { get; set; }

        public int DefaultLanguageId { get; set; }

        public string DefaultLanguageName { get; set; }

        public int DisplayOrder { get; set; }

        public int Status { get; set; }

        public bool IsActive { get; set; }

        public bool IsDeleted { get; set; }
    }
}
