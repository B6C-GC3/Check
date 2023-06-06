using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Shared.DataTransfer.FileUpload
{
    public class FileUploadStatus
    {
        public const string Error = "error";
        public const string Success = "success";
        public const string Done = "done";
        public const string Uploading = "uploading";
        public const string Removed = "removed";
    }

    public class FileUploadRep
    {
        public string Uid { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }
        public string Url { get; set; }
        public int NumberOrder { get; set; }
    }

    public class FileUploadRequest
    {
        public IFormFile File { get; set; }
        public string Id { get; set; }
        public int NumberOrder { get; set; }

    }

}
