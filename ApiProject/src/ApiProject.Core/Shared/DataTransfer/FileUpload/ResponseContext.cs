using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.FileUpload
{
    public class ResponseContext
    {
        public dynamic Data { get; set; }
        public bool IsSuccess { get; set; } = true;
        public string ErrorMessage { get; set; }
    }
}
