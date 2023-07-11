using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.UL
{
    /// <summary>vnp_ResponseCode VNPAY phản hồi qua IPN và Return URL</summary>
    public static class VnpayIPNPaymentUL
    {
        /// <summary>Giao dịch thành công.</summary>
        public const string SUCCESSFUL = "00";
        /// <summary>Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).</summary>
        public const string SUCCESSFUL_SUSPICIOUS_TRANSACTION = "07";
        /// <summary>Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.</summary>
        public const string CLIENT_NOT_REGISTERED_YET = "09";
        /// <summary>Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần.</summary>
        public const string CLIENT_ERROR_VALIDATION = "10";
        /// <summary>Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.</summary>
        public const string CLIENT_TIMEOUT = "11";
        /// <summary>Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.</summary>
        public const string CLIENT_ACCOUNT_LOCKED = "12";
        /// <summary>Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.</summary>
        public const string CLIENT_WRONG_OTP = "13";
        /// <summary>Giao dịch không thành công do: Khách hàng hủy giao dịch.</summary>
        public const string CLIENT_CANCELS_TRANSACTION = "24";
        /// <summary>Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.</summary>
        public const string CLIENT_NOT_ENOUGH_BALANCE = "51";
        /// <summary>Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.</summary>
        public const string CLIENT_TRANSACTION_LIMIT = "65";
        /// <summary>Ngân hàng thanh toán đang bảo trì.</summary>
        public const string VNPAY_MAINTENANCE = "75";
        /// <summary>Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch.</summary>
        public const string CLIENT_WRONG_PASSWORD = "79";
        /// <summary>Lỗi khác.</summary>
        public const string ORTHER = "99";
    }
    
    /// <summary>Tra cứu giao dịch (vnp_Command=querydr)</summary>
    public static class VnpayQuerydrPaymentUL
    {
        /// <summary>Merchant không hợp lệ (kiểm tra lại vnp_TmnCode).</summary>
        public const string MERCHANT_ERROR_VALIDATE = "02";
        /// <summary>Dữ liệu gửi sang không đúng định dạng.</summary>
        public const string DATA_ERROR_VALIDATE = "03";
        /// <summary>Không tìm thấy giao dịch yêu cầu.</summary>
        public const string NOT_FOUND = "91";
        /// <summary>Yêu cầu bị trùng lặp trong thời gian giới hạn của API (Giới hạn trong 5 phút).</summary>
        public const string DUPLICATE_REQUEST = "94";
        /// <summary>Chữ ký không hợp lệ.</summary>
        public const string INVALID_SIGNATURE = "99";
        /// <summary>Lỗi khác.</summary>
        public const string ORTHER = "99";
    }

    ///<summary> Gửi yêu cầu hoàn trả (vnp_Command=refund)</summary>
    public static class VnpayRefundPaymentUL
    {
        /// <summary>Tổng số tiền hoản trả lớn hơn số tiền gốc.</summary>
        public const string PRINCIPAL_LESS_REFUND = "02";
        /// <summary>Dữ liệu gửi sang không đúng định dạng.</summary>
        public const string DATA_ERROR_VALIDATE = "03";
        /// <summary>Không cho phép hoàn trả toàn phần sau khi hoàn trả một phần.</summary>
        public const string NOT_REFUND_ALL = "04";
        /// <summary>Chỉ cho phép hoàn trả một phần.</summary>
        public const string ONLY_PARTIAL_REFUND = "13";
        /// <summary>Không tìm thấy giao dịch yêu cầu.</summary>
        public const string NOT_FOUND = "91";
        /// <summary>Số tiền hoàn trả không hợp lệ. Số tiền hoàn trả phải nhỏ hơn hoặc bằng số tiền thanh toán.</summary>
        public const string INVALID_REFUND_AMOUNT = "93";
        /// <summary>Yêu cầu bị trùng lặp trong thời gian giới hạn của API (Giới hạn trong 5 phút).</summary>
        public const string DUPLICATE_REQUEST = "94";
        /// <summary>Giao dịch này không thành công bên VNPAY. VNPAY từ chối xử lý yêu cầu.</summary>
        public const string REFUSE_PROCESSING = "95";
        /// <summary>Chữ ký không hợp lệ.</summary>
        public const string INVALID_SIGNATURE = "97";
        /// <summary>Timeout Exception</summary>
        public const string TIMEOUT_EXCEPTION = "98";
        /// <summary>Các lỗi khác.</summary>
        public const string ORTHER = "99";
    }
}
