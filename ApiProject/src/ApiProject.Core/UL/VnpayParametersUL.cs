using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.UL
{
    public static class VnpayParametersUL
    {
        /// <summary>Phiên bản api mà merchant kết nối. Phiên bản hiện tại là : 2.0.1 và 2.1.0</summary>
        public const string VERSION = "vnp_Version";
        /// <summary>Mã API sử dụng, mã cho giao dịch thanh toán là: pay</summary>
        public const string COMMAND = "vnp_Command";
        /// <summary>Mã website của merchant trên hệ thống của VNPAY. Ví dụ: 2QXUI4J4</summary>
        public const string TMN_CODE = "vnp_TmnCode";
        /// <summary>Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 10,000 VND (mười nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 1000000</summary>
        public const string AMOUNT = "vnp_Amount";
        /// <summary>Mã Ngân hàng thanh toán. Ví dụ: NCB</summary>
        public const string BANK_CODE = "vnp_BankCode";
        /// <summary>Là thời gian phát sinh giao dịch định dạng yyyyMMddHHmmss(Time zone GMT+7)Ví dụ: 20170829103111</summary>
        public const string CREATE_DATE = "vnp_CreateDate";
        /// <summary>Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND</summary>
        public const string CURR_CODE = "vnp_CurrCode";
        /// <summary>Địa chỉ IP của khách hàng thực hiện giao dịch. Ví dụ: 13.160.92.202</summary>
        public const string IP_ADDR = "vnp_IpAddr";
        /// <summary>Ngôn ngữ giao diện hiển thị. Hiện tại hỗ trợ Tiếng Việt (vn), Tiếng Anh (en)</summary>
        public const string LOCALE = "vnp_Locale";
        /// <summary>Thông tin mô tả nội dung thanh toán (Tiếng Việt, không dấu). Ví dụ: **Nap tien cho thue bao 0123456789. So tien 100,000 VND**</summary>
        public const string ORDER_INFO = "vnp_OrderInfo";
        /// <summary>Mã danh mục hàng hóa. Mỗi hàng hóa sẽ thuộc một nhóm danh mục do VNPAY quy định. Xem thêm bảng Danh mục hàng hóa</summary>
        public const string ORDER_TYPE = "vnp_OrderType";
        /// <summary>URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán. Ví dụ: https://domain.vn/VnPayReturn</summary>
        public const string RETURN_URL = "vnp_ReturnUrl";
        /// <summary>Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày. Ví dụ: 23554</summary>
        public const string TXN_REF = "vnp_TxnRef";
        /// <summary>Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ merchant sang VNPAY. Việc tạo ra mã này phụ thuộc vào cấu hình của merchant và phiên bản api sử dụng. Phiên bản hiện tại hỗ trợ SHA256, HMACSHA512.</summary>
        public const string SECURE_HASH = "vnp_SecureHash";
    }
}
