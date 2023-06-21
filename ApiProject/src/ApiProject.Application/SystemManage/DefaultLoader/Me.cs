using Abp.Application.Services;
using Abp.Localization;
using Abp.Runtime.Session;
using ApiProject.Shared.DataTransfer.Me;
using ApiProject.SystemManage.Users.Dto;
using ApiProject.UL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.SystemManage.DefaultLoader
{
    public interface IMe : IApplicationService
    {
        Task<LocationDetectionDto> LocationDetection();
    }

    public class Me : IMe
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _session;

        public Me(IUnitOfWork unitOfWork, IAbpSession session)
        {
            _session = session;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<LocationDetectionDto> LocationDetection()
        {
            var useProfile = _unitOfWork.GetRepository<Shared.Entitys.UserProfile>().GetAll()
                                        .Where(w => w.CreatorUserId == _session.UserId);
            var language =  _unitOfWork.GetRepository<ApplicationLanguage>().GetAll()
                                       .Where(predicate: p => p.IsDisabled == false && p.IsDeleted == false);

            if (useProfile == null)
            {
                return new LocationDetectionDto
                {
                    Location = "vi"
                };
            }

            var userInfo = from u in useProfile
                           join f in language on u.Nationality equals f.Id
                           select new LocationDetectionDto
                           {
                               Location = f.Name
                           };

            return userInfo.FirstOrDefault();
        }
    }
}
