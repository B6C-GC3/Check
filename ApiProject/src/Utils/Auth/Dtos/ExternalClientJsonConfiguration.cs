using System;
using System.Collections.Generic;
using System.Text;

namespace Utils.Auth.Dtos
{
    public class ExternalClientJsonConfiguration
    {
        public string ReferralUrl { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string ReferralId { get; set; }
        public string RefreshTokenValidityInDays { get; set; }
        public string AccessToken { get; set; }
        public string RefreshTokenValidityInMinutes { get; set; }
        public string RsaPrivateKey { get; set; }
        public string RsaPublicKey { get; set; }
    }
}
