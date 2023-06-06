using Abp.Authorization.Users;
using Abp.Runtime.Session;
using ApiProject.Authorization.Users;
using ApiProject.Command.RoleManage;
using ApiProject.Command.UserManage;
using ApiProject.Editions;
using ApiProject.MultiTenancy;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.User;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.SystemManage.Users.UserTenant
{
    public class UserTenantAppService : IUserTenantAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly EditionManager _editionManager;
        private readonly IAbpSession _abpSession;
        private readonly UserManager _userManager;
        public UserTenantAppService(IUnitOfWork unitOfWork, EditionManager editionManager, IAbpSession abpSession, UserManager userManager)
        {
            _unitOfWork = unitOfWork;
            _editionManager = editionManager;
            _abpSession = abpSession;
            _userManager = userManager;
        }

        private const string KEY = "TENANT";
        private const string ACCOUNT = "ACCOUNT";
        private const string ROLE = "ROLE";
        private const string INPUT = "INPUT";

        [HttpPost]
        public async Task<int> Create([FromBody] UserTenantInsertUpdateDto input)
        {
            var timeSystem = await _unitOfWork.GetDateTime();
            var userCreateId = _abpSession.UserId;

            // kiem tra tenant
            var tenant = await _unitOfWork.GetRepository<Tenant>()
                              .GetFirstOrDefaultAsync(predicate: m => m.Id == input.TenantId);

            if (tenant == null) throw new ClientException(KEY, ERROR_DATA.DATA_NULL);

            // kiem tra tai khoan kiem tra email kiem tra sdt
            var resultAccount = await _unitOfWork.CheckUserAccount(email: input.User.Email, userName: input.User.UserName,
                                                                   phone: input.User.Phone, tenantId: input.TenantId);

            if (resultAccount != null && resultAccount.Id != 0)
                throw new ClientException(ACCOUNT, ERROR_DATA.DATA_EXIST);

            // checkRole And TenantId
            var roleCheck = await _unitOfWork.CheckRoleTenantForUser(input.TenantId, input.RoleIds);
            if (roleCheck != null && roleCheck.Count == 0)
                throw new ClientException(ROLE, ERROR_DATA.DATA_NOT_EXIST);

            // process account
            List<UserRole> roles = new();

            User user = new()
            {
                TenantId = input.TenantId,
                UserName = input.User.UserName,
                Name = input.User.UserName,
                IsActive = true,
                IsDeleted = false,
                NormalizedEmailAddress = input.User.Email.ToUpper(),
                EmailAddress = input.User.Email,
                NormalizedUserName = input.User.UserName.ToUpper(),
                Surname = input.User.UserName,
                Password = input.User.Password,
                PhoneNumber = input.User.Phone,
                CreatorUserId = userCreateId,
                CreationTime = timeSystem
            };

            await _userManager.InitializeOptionsAsync(input.TenantId);
            await _userManager.CreateAsync(user, input.User.Password);
            user.Id = 0;
            try
            {
                await _unitOfWork.GetRepository<User>().InsertAsync(user);
                _unitOfWork.SaveChanges(true);
            }
            catch { }

            // process table Userrole
            input.RoleIds.ForEach(p => roles.Add(new UserRole { CreatorUserId = userCreateId, RoleId = p, TenantId = input.TenantId, UserId = user.Id }));
            await _unitOfWork.GetRepository<UserRole>().InsertAsync(roles);
            _unitOfWork.SaveChanges(true);

            UserAccount useAccount = new()
            {
                CreationTime = timeSystem,
                CreatorUserId = userCreateId,
                EmailAddress = user.EmailAddress,
                LastModificationTime = timeSystem,
                TenantId = user.TenantId,
                UserId = user.Id,
                UserName = user.UserName
            };

            await _unitOfWork.GetRepository<UserAccount>().InsertAsync(useAccount);
            _unitOfWork.SaveChanges(true);

            return 1;
        }

        [HttpGet]
        public Task<IPagedList<UserTenantReviewDto>> GetAll(SearchRequest input)
        {
            var isInputFail = input is null || input.ValuesSearch is null 
                || input.ValuesSearch[0] is null || input.ValuesSearch[0] == "0";

            if (isInputFail) throw new ClientException(INPUT, ERROR_DATA.DATA_NULL);

            var data = _unitOfWork.GetUserByTenantId(input);
            return data;
        }
    }
}
