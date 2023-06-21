using Abp.Localization;
using Abp.Runtime.Session;
using ApiProject.Shared.DataTransfer.LanguageDto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.SystemManage.LanguageSevice
{
    public class LanguageAppService : ILanguageAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public LanguageAppService(IAbpSession abpSession, IUnitOfWork unitOfWork)
        {
            _abpSession = abpSession;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<List<LanguageSystemDto>> GetAllLaguage()
        {
            var dataLag = await _unitOfWork.GetRepository<ApplicationLanguage>()
                                           .GetAllAsync(predicate: p => p.IsDisabled == false && p.IsDeleted == false);

            return dataLag.Select(s => new LanguageSystemDto { Id = s.Id, DisplayName = s.DisplayName, Name = s.Name, Icon = s.Icon }).ToList();
        }
    }
}
