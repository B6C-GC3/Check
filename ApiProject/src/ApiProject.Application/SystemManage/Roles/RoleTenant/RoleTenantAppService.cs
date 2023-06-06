using Abp.Runtime.Session;
using ApiProject.Authorization.Roles;
using ApiProject.Command.RoleManage;
using ApiProject.MultiTenancy;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Role;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Any;
using Utils.Exceptions;

namespace ApiProject.Roles.RoleTenant
{
    public class RoleTenantAppService : IRoleTenantAppService
    {
        private const string TENANT = "TENANT";
        private const string USER = "USER";
        private const string NAMEROLE = "NAMEROLE";
        private const string DEFAULT = "DEFAULT";
        private const string STATIC = "STATIC";
        private const string ROLE = "ROLE";

        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public RoleTenantAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpGet]
        public async Task<IPagedList<RoleTenantReadDto>> GetAllRoleByTenantId(SearchRequest input, int tenantId)
        {
            // kiểm tra tenant
            var isTenant = await _unitOfWork.GetRepository<Tenant>().ExistsAsync(m => m.Id == tenantId);
            if (!isTenant)
                throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);
            // Lấy dữ liệu
            var rs = await _unitOfWork.ToGetRoleSql(input, tenantId);
            // sử lý dữ liệu
            return rs;
        }

        [HttpPost]
        public async Task<int> CreateRoleTenantBasic([FromBody] RoleTenantBasicDto input)
        {
            //kiểm tra tên 
            var nameConvert = input.DisplayName.ConvertVietNamese();
            var nameConvertNormalized = input.DisplayName.FromViToConst();
            var userId = _abpSession.UserId;
            var isTenant = await _unitOfWork.GetRepository<Tenant>().ExistsAsync(m => m.Id == input.TenantId);
            if (!isTenant)
                throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);
            if (input.DisplayName.ToUpper() == "ADMIN".ToUpper() || input.DisplayName.ToUpper() == "administrator".ToUpper())
                throw new ClientException(NAMEROLE, ERROR_DATA.UNAUTHORIZED);
            if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.Name.ToUpper() == nameConvert.ToUpper()
                                                                      && m.NormalizedName.ToUpper() == nameConvertNormalized.ToLower()
                                                                      && m.TenantId == input.TenantId
                                                                      && m.IsDeleted == false))
                throw new ClientException(NAMEROLE, ERROR_DATA.EXIST);
            //kiểm tra mặc định
            if (input.IsDefault == true) // nếu chuyển role về dạng kích hoạt thêm mới mặc định
                if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.TenantId == input.TenantId
                                                                          && m.IsDefault == true
                                                                          && m.IsDeleted == false))
                    throw new ClientException(DEFAULT, ERROR_DATA.EXIST);
            //kiểm tra duy nhất
            if (input.IsStatic == true) // nếu đổi thành trạng thái duy nhất
                if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.TenantId == input.TenantId
                                                                          && m.IsStatic == true
                                                                          && m.IsDeleted == false))
                    throw new ClientException(STATIC, ERROR_DATA.EXIST);

            var timeDB = await _unitOfWork.GetDateTime();
            // cập nhật
            var role = new Role()
            {
                CreationTime = timeDB,
                CreatorUserId = userId,
                DisplayName = input.DisplayName,
                IsDefault = input.IsDefault,
                IsDeleted = input.IsDeleted,
                IsStatic = input.IsStatic,
                LastModificationTime = timeDB,
                LastModifierUserId = userId,
                Name = nameConvert,
                NormalizedName = nameConvertNormalized,
                TenantId = input.TenantId,
                Description = input.Description
            };
            _unitOfWork.GetRepository<Role>().Insert(role);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpPost]
        public async Task<int> UpdateRoleTenanatBasic([FromBody] RoleTenantBasicDto input)
        {
            //kiểm tra tên
            var nameConvert = input.DisplayName.ConvertVietNamese();
            var nameConvertNormalized = input.DisplayName.FromViToConst();
            var userId = _abpSession.UserId;

            // tìm kiếm role
            var role = await _unitOfWork.GetRepository<Role>().GetFirstOrDefaultAsync(predicate: m => m.Id == input.Id);
            if (role == null)
                throw new ClientException(ROLE, ERROR_DATA.EXIST);
            // tên không được phép
            if (input.DisplayName.ToUpper() == "ADMIN".ToUpper() || input.DisplayName.ToUpper() == "administrator".ToUpper())
                throw new ClientException(NAMEROLE, ERROR_DATA.UNAUTHORIZED);
            // kiem tra nếu có sự thay đổi tên thì kiểm tra tồn tại tên trong csdl
            if (input.DisplayName != role.DisplayName) // có sự thay đổi tên
                if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.Name.ToUpper() == nameConvert.ToUpper()
                                                                      && m.NormalizedName.ToUpper() == nameConvertNormalized.ToLower()
                                                                      && m.TenantId == input.TenantId
                                                                      && m.Id != role.Id
                                                                      && m.IsDeleted == false)) // có tồn tại trong csdl
                    throw new ClientException(NAMEROLE, ERROR_DATA.EXIST);
            //kiểm tra nếu như chuyển default thành true thì kiểm tra tồn tại default csdl
            if (input.IsDefault == true) // nếu chuyển role về dạng kích hoạt thêm mới mặc định
                if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.TenantId == input.TenantId
                                                                          && m.IsDefault == true
                                                                          && m.Id != role.Id
                                                                          && m.IsDeleted == false)) // kiểm tra tenant có mặc định không
                    throw new ClientException(DEFAULT, ERROR_DATA.EXIST);
            //kiểm tra nếu như chuyển static thành true thì kiểm tra tồn tại default csdl
            if (input.IsStatic == true) // nếu đổi thành trạng thái duy nhất
                if (await _unitOfWork.GetRepository<Role>().CountAsync(m => m.TenantId == input.TenantId
                                                                         && m.Id != role.Id
                                                                         && m.IsDeleted == false) != 1) // nếu số lượng role lớn hơn 1
                    throw new ClientException(STATIC, ERROR_DATA.EXIST);

            var timeDB = await _unitOfWork.GetDateTime();
            // cập nhật
            role.CreationTime = timeDB;
            role.CreatorUserId = userId;
            role.DisplayName = input.DisplayName;
            role.IsDefault = input.IsDefault;
            role.IsDeleted = input.IsDeleted;
            role.IsStatic = input.IsStatic;
            role.LastModificationTime = timeDB;
            role.LastModifierUserId = userId;
            role.Name = nameConvert;
            role.NormalizedName = nameConvertNormalized;
            role.TenantId = input.TenantId;
            role.Description = input.Description;

            _unitOfWork.GetRepository<Role>().Update(role);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpGet]
        public async Task<IPagedList<RopeTenantDictionaryDto>> LoadRoleSelectForUser(SearchRequest input)
        {
            var isIntTenant = Int32.TryParse(input.ValuesSearch[0], out int idTenant);
            if (!isIntTenant) throw new ClientException(TENANT, ERROR_DATA.DATA_BASIC_FAIL);

            // kiểm tra tenant
            var isTenant = await _unitOfWork.GetRepository<Tenant>().ExistsAsync(m => m.Id == idTenant);
            if (!isTenant) throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);
            // Lấy dữ liệu
            var rs = await _unitOfWork.LoadRoleForUser(input);
            // sử lý dữ liệu
            return rs;
        }
    }
}
