using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.Common
{
    /// <summary> Phân trang </summary>
    public class PagedListRequest
    {
        /// <summary>Số bản ghi trang hiện tại</summary>
        private int pageSize;
        public int PageIndex { get; set; }
        public int PageSize { get => pageSize; set => pageSize = (value == 0 ? 20 : value); }
    }
}
