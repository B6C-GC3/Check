using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.PermissionService
{
    public class PermissionRemote
    {
    }

    public class UpdatePermissionForRoleTenantDto
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public List<string> Permissins { get; set; }
    }

    public class UpdatePermissionForTenantDto
    {
        public int Id { get; set; }
        public List<string> Permissins { get; set; }
    }
}
