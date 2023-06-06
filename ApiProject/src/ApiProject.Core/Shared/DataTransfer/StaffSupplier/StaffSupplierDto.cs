using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.StaffSupplier
{
    public class StaffSupplierDto
    {
        [Required]
        public long UserAccount { get; set; }

        [Required]
        [MaxLength(5)]
        public int Hierarchical { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }

        /* ---------------------------------------------------------*/

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsDeleted { get; set; }

        public DateTime? CreationTime { get; set; }
    }
}
