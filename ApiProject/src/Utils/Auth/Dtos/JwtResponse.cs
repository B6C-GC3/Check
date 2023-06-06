using System;
using System.Collections.Generic;
using System.Text;

namespace Utils.Auth.Dtos
{
    public class JwtResponse
    {
        public string Token { get; set; }
        public string AccessToken { get; set; }
    }
}
