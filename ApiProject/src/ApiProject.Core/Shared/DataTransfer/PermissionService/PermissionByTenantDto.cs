using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.PermissionService
{
    public class PermissionByTenantDto
    {
        public Int64 Id { get; set; }
        public string Discriminator { get; set; }
        public bool IsGranted { get; set; }
        public string Name { get; set; }
        public Int64 TenantId { get; set; }
        public Int64 RoleId { get; set; }
        public Int64 UserId { get; set; }
    }

    public class PermissionInsertDto : PermissionByTenantDto
    {
        public string CreationTime { get; set; }
        public string CreatorUserId { get; set; }
    }
}
