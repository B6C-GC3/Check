using System;
using System.Collections.Generic;
using System.Text;
using Utils.Auth.Dtos;

namespace Utils.Auth
{
    public interface IJwtHandler
    {
        JwtResponse CreateToken(JwtCustomClaims claims);
        JwtCustomClaims ReadFullInfomation(string token);
        bool ValidateToken(string token);
        JwtCustomClaims ReadFullHisTory(string token);
    }
}