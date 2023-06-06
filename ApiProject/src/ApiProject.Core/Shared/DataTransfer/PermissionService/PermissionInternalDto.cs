using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.PermissionService
{
    public class PermissionInternalDto
    {
    }

    public class PermissionInternalTreeDto
    {
        public string Key { get; set; }
        public List<PermissionInternalTreeDto> Children { get; set; }
    }
}
