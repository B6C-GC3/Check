using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Utils.Email.Dtos;

namespace Utils.Email
{
    public interface IMailService
    {
        Task SendFileEmailAsync(FileMailRequest mailRequest);
        Task SendHtmlEmailAsync(HtmlMailRequest request);
        Task SendTextEmailAsync(TextMailRequest request);
        Task SendHtmlEmailVerifiCatioAsync(HtmlMailRequest request, VerificationCode verificationCode);
    }
}