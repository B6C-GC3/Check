using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace Utils.Any
{
    public static class RegexProcess
    {
        public const string SPECIAL_CHAR_USER = @"^[a-zA-Z0-9!@#$%&*.\s_\-]+";
        /// <summary>
        /// Kiểm tra ký tự đặc biệt
        /// </summary>
        public const string SPECIAL_CHAR = "[+=`!#$%*()'\":;<>?]";
        /// <summary>
        /// Kiểm tra ký tự đặc biệt
        /// </summary>
        public const string UN_SPECIAL_CHAR = @"[^+=`!#$%*()@{}'\"":;<>?]{0,}$";
        /// <summary>
        /// Kiểm tra ký tự đặc biệt
        /// </summary>
        public const string DATA_ANNO_SPECIAL_CHAR = @"[a-zA-Z0-9-_\s]{0,}$";
        /// <summary>
        /// Kiểm tra chuỗi ít nhất phải có 1 số
        /// </summary>
        public const string CHECK_NUMBER = "[0-9]{1,}"; //\d
        /// <summary>
        /// Kiểm tra ký tự thường xuất hiện  2 lần trở lên
        /// </summary>
        public const string DOUBLE_NORMAL_CHAR = "[a-z]{1,}";
        /// <summary>
        /// Số lượng ký tự cần có
        /// </summary>
        public const string NUMBER_CHAR = ".{8,}";
        /// <summary>
        /// Chuỗi phải có một ký tự
        /// </summary>
        public const string CHAR_LETTER = "[A-Z]{1,}";
        /// <summary>
        /// Kiểm tra cấu trúc gmail
        /// </summary>
        public const string CHECK_TYPES_EMAIL = "[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com)";
        /// <summary>
        /// Validate Email
        /// </summary>
        public const string IS_EMAIL_VALIDATE = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
        /// <summary>
        /// Có ít nhất 10 ký tự
        /// </summary>
        public const string CHECK_TEN_CHAR = "^.{0,10}$";
        /// <summary>
        /// Kiểm tra khoảng trắng
        /// </summary>
        public const string CHECK_SPACE = "^[^\\s]+$";
        /// <summary>
        ///  kiểm tra số điện thoại
        /// </summary>
        public const string NUMBER_PHONE = @"(^(84|0))([0-9]{4,10}$)";
        /// <summary>
        /// Kiểm tra số điện thoại việt nam
        /// </summary>
        public const string CHECK_NUMBER_PHONE_VN = @"(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}";
        /// <summary>
        /// kiểm tra dấu chéo ngược
        /// </summary>
        public static readonly string CHECK_CHAR_BACKSLASH = String.Format(@"[\\{0}]", "\"");
        /// <summary>
        /// Kiểm tra email
        /// </summary>
        public const string CHECK_EMAIL = @"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*";
        /// <summary>
        /// kiểm tra độ mạnh mật khẩu
        /// </summary>
        public const string CHECK_PASSWORD = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
        /// <summary>
        /// Kiểm tra định dạng ip v4
        /// </summary>
        public const string CHECK_IP_V4 = @"\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b";
        /// <summary>
        /// kiểm tra định dạng ip v6
        /// </summary>
        public const string CHECK_IP_V6 = @"(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))";
        /// <summary>
        /// kiểm tra chữ số hằng nghìn
        /// </summary>
        public const string CHECK_THOUSANDS_SEPARATOR = @"/\d{1,3}(?=(\d{3})+(?!\d))/g ";
        /// <summary>
        ///  Lấy tên miền từ URL
        /// </summary>
        public const string GET_DOMAIN_FROM_URL = @"/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i ";
        /// <summary>
        /// Đường dẫn tối giản
        /// </summary>
        public const string URL_SIMPLIFY = @"^[a-zA-Z0-9_/\-]+";
        /// <summary>
        /// Kiểm tra đường dẫn tối dản
        /// </summary>
        public const string URL_NO_HTTP = @"^(\/|https:\/\/|http:\/\/)([a-zA-Z0-9][a-zA-Z0-9-_?%=&:\/]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_?%=&:\/]*[[a-zA-Z0-9]+$";
        /// <summary>
        /// Kiểm tra đường dẫn tối dản hoặc đầy đủ
        /// </summary>
        public const string URL_FULL = @"^(\/|https:\/\/|http:\/\/)([a-zA-Z0-9][a-zA-Z0-9-_?%=&:\/]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_?%=&:\/]*[[a-zA-Z0-9]+$";
        /// <summary>
        ///  Kiểm tra định dạng ngày tháng
        /// </summary>
        public const string CHECK_FORMAT_DATETIME = @"(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$ ";
        /// <summary>
        /// Tên việt nam
        /// </summary>
        public const string NAME_VN = @"^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ\s_,.\-]+";
        /// <summary>
        /// Kiểm tra định dạng UserName
        /// </summary>
        public const string USERNAME = @"^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$";

        /// <summary>Sử lý Regex</summary>
        public static bool ToRegexIsMatch(this string str, string rexge) => Regex.IsMatch(str, rexge);
        public static Match ToRegexMatch(this string str, string rexge) => Regex.Match(str, rexge);
        public static string ToRegexReplace(this string str, string replacement, string rexge)
                   => Regex.Replace(input: str, replacement: replacement, pattern: rexge);
    }
}
