using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.Common
{
    /// <summary> Sắp xếp dữ liệu </summary>
    public class OrderByRequest : PagedListRequest
    {
        /// <summary>Tên trường sắp xếp</summary>
        public string PropertyOrder { get; set; }
        /// <summary>Sắp xếp</summary>
        public bool ValueOrderBy { get; set; }
    }
}
