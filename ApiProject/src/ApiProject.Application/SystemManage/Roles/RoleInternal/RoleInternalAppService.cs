using Abp.Runtime.Session;
using ApiProject.Authorization.Roles;
using ApiProject.Command.RoleManage;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Role;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Any;
using Utils.Exceptions;

namespace ApiProject.Roles.RoleInternal
{
    /// <summary>Viết lại hàm Role để sử dụng phân quyền cơ động hơn cho nhiều dự án</summary>
    public class RoleInternalAppService : IRoleInternalAppService
    {
        private const string TENANT = "TENANT";
        private const string USER = "USER";
        private const string NAMEROLE = "NAMEROLE";
        private const string DEFAULT = "DEFAULT";
        private const string STATIC = "STATIC";
        private const string ROLE = "ROLE";

        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public RoleInternalAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpGet]
        public async Task<IPagedList<RoleInternalReadDto>> GetAllRole(SearchRequest input)
        {
            // Kiểm tra tenant
            if (_abpSession.TenantId == null || _abpSession.TenantId == 0)
            {
                throw new ClientException(TENANT, ERROR_DATA.DATA_NULL);
            }
            // Check User Id
            if (_abpSession.UserId == null || _abpSession.UserId == 0)
            {
                throw new ClientException(USER, ERROR_DATA.DATA_NULL);
            }
            // Lấy dữ liệu
            var rs = await _unitOfWork.ToGetRoleSql(input, _abpSession.TenantId);
            // sử lý dữ liệu
            return null;
        }

        [HttpPost]
        public async Task<int> CreateRoleBasic(RoleInternalBasicDto input)
        {
            //kiểm tra tên 
            var nameConvert = input.DisplayName.ConvertVietNamese();
            var nameConvertNormalized = input.DisplayName.FromViToConst();
            var tenantId = _abpSession.TenantId;
            var userId = _abpSession.UserId;

            if (input.DisplayName.ToUpper() == "ADMIN".ToUpper() || input.DisplayName.ToUpper() == "administrator".ToUpper())
                throw new ClientException(NAMEROLE, ERROR_DATA.UNAUTHORIZED);
            if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.Name.ToUpper() == nameConvert.ToUpper()
                                                                      && m.NormalizedName.ToUpper() == nameConvertNormalized.ToLower()
                                                                      && m.TenantId == tenantId
                                                                      && m.IsDeleted == false))
                throw new ClientException(NAMEROLE, ERROR_DATA.EXIST);
            //kiểm tra mặc định
            if (input.IsDefault == true) // nếu chuyển role về dạng kích hoạt thêm mới mặc định
                if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.TenantId == tenantId
                                                                          && m.IsDefault == true
                                                                          && m.IsDeleted == false))
                    throw new ClientException(DEFAULT, ERROR_DATA.EXIST);
            //kiểm tra duy nhất
            if (input.IsStatic == true) // nếu đổi thành trạng thái duy nhất
                if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.TenantId == tenantId
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
                TenantId = tenantId,
                Description = input.Description
            };
            _unitOfWork.GetRepository<Role>().Insert(role);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpPost]
        public async Task<int> UpdateRoleBasic(RoleInternalBasicDto input)
        {
            //kiểm tra tên
            var nameConvert = input.DisplayName.ConvertVietNamese();
            var nameConvertNormalized = input.DisplayName.FromViToConst();
            var tenantId = _abpSession.TenantId;
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
                                                                      && m.TenantId == tenantId
                                                                      && m.Id != role.Id
                                                                      && m.IsDeleted == false)) // có tồn tại trong csdl
                    throw new ClientException(NAMEROLE, ERROR_DATA.EXIST);
            //kiểm tra nếu như chuyển default thành true thì kiểm tra tồn tại default csdl
            if (input.IsDefault == true) // nếu chuyển role về dạng kích hoạt thêm mới mặc định
                if (await _unitOfWork.GetRepository<Role>().ExistsAsync(m => m.TenantId == tenantId
                                                                          && m.IsDefault == true
                                                                          && m.Id != role.Id
                                                                          && m.IsDeleted == false)) // kiểm tra tenant có mặc định không
                    throw new ClientException(DEFAULT, ERROR_DATA.EXIST);
            //kiểm tra nếu như chuyển static thành true thì kiểm tra tồn tại default csdl
            if (input.IsStatic == true) // nếu đổi thành trạng thái duy nhất
                if (await _unitOfWork.GetRepository<Role>().CountAsync(m => m.TenantId == tenantId
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
            role.TenantId = tenantId;
            role.Description = input.Description;

            _unitOfWork.GetRepository<Role>().Update(role);
            _unitOfWork.SaveChanges();

            return 1;
        }


    }
}
