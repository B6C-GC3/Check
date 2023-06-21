using Abp.Application.Services;
using ApiProject.Shared.DataTransfer.LanguageDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.SystemManage.LanguageSevice
{
    public interface ILanguageAppService : IApplicationService
    {
        Task<List<LanguageSystemDto>> GetAllLaguage();
    }
}
