using Abp.Application.Services;
using Abp.Domain.Entities.Auditing;
using Abp.Runtime.Session;
using ApiProject.FileExtention;
using ApiProject.ObjectValues;
using ApiProject.SystemManage.Users.Dto;
using ApiProject.UL;
using Lib.ImageProcessing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Exceptions;
using Utils.ImageProcess.Enum;

namespace ApiProject.SystemManage.Users
{
    public interface IInfoUser : IApplicationService
    {
        Task<UserInfoResDto> Get();
        Task<int> Set(UserInfoDto input);
    }

    public class InfoUser : IInfoUser
    {
        private readonly IAbpSession _session;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHostingEnvironment _hostingEnvironment;
        public InfoUser(IUnitOfWork unitOfWork, IAbpSession session, IHostingEnvironment hostingEnvironment)
        {
            _session = session;
            _unitOfWork = unitOfWork;
            _hostingEnvironment = hostingEnvironment;
        }

        public async Task<UserInfoResDto> Get()
        {
            var useProfile = _unitOfWork.GetRepository<Shared.Entitys.UserProfile>().GetAll().Where(w => w.CreatorUserId == _session.UserId);
            var fileSource = _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().GetAll();

            var userInfo = from u in useProfile
                           join f in fileSource on u.AvatarId equals f.Id
                           select new UserInfoResDto
                           {
                               Name = u.Name,
                               Sexe = (UserInfoSexeUL)u.Sexe,
                               Email = u.Email,
                               NumberPhone = u.NumberPhone,
                               Nationality = u.Nationality,
                               DateOfBirth = u.DateOfBirth,
                               AvatarUrl = string.Format("{0}/{1}", f.Folder, f.VirtualPath),
                               Nickname = u.Nickname
                           };

            return userInfo.FirstOrDefault();
        }

        [HttpPost]
        public async Task<int> Set([FromBody] UserInfoDto input)
        {
            const string FOLDER_SAVE = "BbvTHviiQD";

            if (_session.UserId is null || _session.UserId == 0) throw new ClientException("USER", ERROR_DATA.DATA_NULL);

            var useProfile = await _unitOfWork.GetRepository<Shared.Entitys.UserProfile>()
                                              .GetFirstOrDefaultAsync(predicate: fod => fod.CreatorUserId == _session.UserId);

            if (useProfile == null)
            {
                var name = NameAvatarDefault.GenerateAvtarImage(input.Name, string.Format("{0}/{1}/", _hostingEnvironment.WebRootPath, FOLDER_SAVE));
                var fileSource = new Shared.Entitys.FileSourceEntity
                {
                    ImageName = name.Substring(0, 32),
                    MimeType = MimeType.PortableNetworkGraphics,
                    IsNew = true,
                    VirtualPath = name,
                    Size = "FULL",
                    Folder = FOLDER_SAVE,
                    Types = (int)TypeFile.Avatar,
                    IsActive = true,
                    IsDeleted = false,
                    CreatorUserId = _session.UserId,
                    LastModifierUserId = _session.UserId
                };

                _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().Insert(fileSource);
                _unitOfWork.SaveChanges();

                // create
                var userInfo = new Shared.Entitys.UserProfile
                {
                    Name = input.Name,
                    Nickname = input.Nickname,
                    IsActive = true,
                    IsDeleted = false,
                    CreatorUserId = _session.UserId,
                    LastModifierUserId = _session.UserId,
                    Nationality = input.Nationality,
                    AvatarId = fileSource.Id,
                    DateOfBirth = input.DateOfBirth,
                    Email = input.Email,
                    NumberPhone = input.NumberPhone,
                    Sexe = (int)input.Sexe
                };

                _unitOfWork.GetRepository<Shared.Entitys.UserProfile>().Insert(userInfo);
                _unitOfWork.SaveChanges();
            }
            else
            {
                // update
                if (input.Name != useProfile.Name)
                {
                    var name = NameAvatarDefault.GenerateAvtarImage(input.Name, string.Format("{0}/{1}/", _hostingEnvironment.WebRootPath, FOLDER_SAVE));
                    var fileSource = new Shared.Entitys.FileSourceEntity
                    {
                        ImageName = name.Substring(0, 32),
                        MimeType = MimeType.PortableNetworkGraphics,
                        IsNew = true,
                        VirtualPath = name,
                        Size = "FULL",
                        Folder = FOLDER_SAVE,
                        Types = (int)TypeFile.Avatar,
                        IsActive = true,
                        IsDeleted = false,
                        CreatorUserId = _session.UserId,
                        LastModifierUserId = _session.UserId
                    };

                    _unitOfWork.GetRepository<Shared.Entitys.FileSourceEntity>().Insert(fileSource);
                    _unitOfWork.SaveChanges();

                    useProfile.AvatarId = fileSource.Id;
                }


                useProfile.Name = input.Name;
                useProfile.Nickname = input.Nickname;
                useProfile.CreatorUserId = _session.UserId;
                useProfile.LastModifierUserId = _session.UserId;
                useProfile.Nationality = input.Nationality;
                useProfile.DateOfBirth = input.DateOfBirth;
                useProfile.Sexe = (int)input.Sexe;

                _unitOfWork.GetRepository<Shared.Entitys.UserProfile>().Update(useProfile);
                _unitOfWork.SaveChanges();
            }

            return 1;
        }
    }
}
