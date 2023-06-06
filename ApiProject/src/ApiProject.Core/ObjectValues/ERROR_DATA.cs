using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.ObjectValues
{
    public static class ERROR_DATA
    {
        public const string NOT_NULL = "NOT_NULL";
        /// <summary>Ký tự đặc biệt</summary>
        public const string SPECIAL_CHARACTERS = "SPECIAL_CHARACTERS";
        /// <summary>Không Ký tự đặc biệt</summary>
        public const string NOT_SPECIAL_CHARACTERS = "NOT_SPECIAL_CHARACTERS";
        /// <summary>Số ký tự vượt giới hạn</summary>
        public const string MAX_LENGTH = "MAX_LENGTH";
        /// <summary>Số ký tự quá nhỏ</summary>
        public const string MIN_LENGTH = "MIN_LENGTH";
        /// <summary>Đã tồn tại</summary>
        public const string EXIST = "EXIST";
        /// <summary>Không tồn tại</summary>
        public const string NOT_EXIST = "NOT_EXIST";
        /// <summary>Sai định dạng</summary>
        public const string WRONG_FORMAT = "WRONG_FORMAT";
        /// <summary>Dữ liệu không thay đổi</summary>
        public const string DATA_NO_CHANGES = "DATA_NO_CHANGES";
        /// <summary>Sai định dạng ngày tháng</summary>
        public const string DATE_WRONG_FORMAT = "DATE_WRONG_FORMAT";
        /// <summary>Tài khaonr mật khẩu không chứa ký tự đặc biệt</summary>
        public const string ACCOUNT_PASSS_SPECIAL_CHARACTERS = "ACCOUNT_PASSS_SPECIAL_CHARACTERS";
        /// <summary>Số điện thoại không chính xác</summary>
        public const string NUMBERPHONE_WRONG_FORMAT = "NUMBERPHONE_WRONG_FORMAT";
        /// <summary>Email không chính xác</summary>
        public const string EMAIL_WRONG_FORMAT = "EMAIL_WRONG_FORMAT";
        /// <summary></summary>
        public const string DOUBLE_ROLE = "DOUBLE_ROLE";
        /// <summary>Dữ liệu cơ bản lỗi</summary>
        public const string DATA_BASIC_FAIL = "DATA_BASIC_FAIL";
        /// <summary>Không Xác định</summary>
        public const string UNKNOWN = "UNKNOWN";
        /// <summary>Xác thực tài khoản</summary>
        public const string VERIFICATION = "VERIFICATION";
        /// <summary>Không được phép</summary>
        public const string UNAUTHORIZED = "UNAUTHORIZED";
        /// <summary>Không thỏa mãn </summary>
        public const string UNSATISFACTORY = "UNSATISFACTORY";
        /// <summary>Thêm mới thất bại</summary>
        public const string INSERT_FAIL = "INSERT_FAIL";
        /// <summary>Cập nhật thất bại </summary>
        public const string UPDATE_FAIL = "UPDATE_FAIL";
        /// <summary>Tài khoản mật khẩu không đúng </summary>
        public const string ACC_PASS_INCORRECT = "ACC_PASS_INCORRECT";
        /// <summary>Kiểm tra thất bại </summary>
        public const string CHECK_FAIL = "CHECK_FAIL";
        /// <summary>Máy chủ kiểm tra thất bại </summary>
        public const string SERVER_CHECK_FAIL = "SERVER_CHECK_FAIL";
        /// <summary>Lỗi thực thi </summary>
        public const string TRY_CATCH = "TRY_CATCH";
        /// <summary>Dữ liệu đầu vào rỗng </summary>
        public const string DATA_NULL = "DATA_NULL";
        /// <summary>Dữ liệu đã tồn tại </summary>
        public const string DATA_EXIST = "DATA_EXIST";
        /// <summary>Dữ liệu không tồn tại </summary>
        public const string DATA_NOT_EXIST = "DATA_NOT_EXIST";
    }

}
