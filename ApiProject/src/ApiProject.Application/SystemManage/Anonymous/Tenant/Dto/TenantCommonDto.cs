using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Anonymous.Tenant.Dto
{
    public class TenantCommonDto
    {
        public string Name { get; set; }
        public string TenancyName { get; set; }
    }

    public class TenantCommonIdDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string TenancyName { get; set; }
    }
}
