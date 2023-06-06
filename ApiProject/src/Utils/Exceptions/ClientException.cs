using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Web.Http.ExceptionHandling;

namespace Utils.Exceptions
{
    /// <summary>
    /// Chỉ dùng cho các loại lỗi 4XX  từ phía client
    /// <para>400 Bad Request – Request không hợp lệ.</para>
    /// <para>401 Unauthorized – Request cần có Authentication.</para>
    /// <para>403 Forbidden – Máy chủ từ chối do quá tải.</para>
    /// <para>404 Not Found – Không tìm thấy trang được yêu cầu.</para>
    /// <para>405 Method Not Allowed – Phương thức không cho phép với user hiện tại.</para>
    /// <para>410 Gone – Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.</para>
    /// <para>415 Unsupported Media Type – Không hỗ trợ kiểu Resource này.</para>
    /// <para>422 Unprocessable Entity – Dữ liệu không được xác thực do thiếu thông tin</para>
    /// <para>429 Too Many Requests – Request bị từ chối do bị giới hạn.</para>
    /// </summary>
    [Serializable]
    public class ClientException : Exception
    {
        public int errorCode;
        public override string Message
        {
            get { return _Message; }
        }

        private string _Message;
        /// <summary>
        /// Chỉ dùng cho các loại lỗi 4XX  từ phía client
        /// <para>400 Bad Request – Request không hợp lệ.</para>
        /// <para>401 Unauthorized – Request cần có Authentication.</para>
        /// <para>403 Forbidden – Máy chủ từ chối do quá tải.</para>
        /// <para>404 Not Found – Không tìm thấy trang được yêu cầu.</para>
        /// <para>405 Method Not Allowed – Phương thức không cho phép với user hiện tại.</para>
        /// <para>410 Gone – Resource không còn tồn tại, Version cũ đã không còn hỗ trợ.</para>
        /// <para>415 Unsupported Media Type – Không hỗ trợ kiểu Resource này.</para>
        /// <para>422 Unprocessable Entity – Dữ liệu không được xác thực do thiếu thông tin</para>
        /// <para>429 Too Many Requests – Request bị từ chối do bị giới hạn.</para>
        /// </summary>
        public ClientException(int StatusCode, string message) : base(message)
        {
            errorCode = StatusCode;
        }

        public ClientException(string field, string content)
        {
            errorCode = 400;
            _Message = JsonConvert.SerializeObject(new { field = field, content = content });
        }

        public ClientException(int errorcode, string field, string content)
        {
            errorCode = errorcode;
            _Message = JsonConvert.SerializeObject(new { field = field, content = content });
        }
    }
}
