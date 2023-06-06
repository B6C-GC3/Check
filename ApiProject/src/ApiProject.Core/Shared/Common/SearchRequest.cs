using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.Common
{
    /// <summary> Tìm kiếm dữ liệu </summary>
    public class SearchRequest : OrderByRequest
    {
        /// <summary>Tên trường tìm kiếm</summary>
        public string[] PropertySearch { get; set; }
        /// <summary>Nội dung</summary>
        public string[] ValuesSearch { get; set; }
    }
}
