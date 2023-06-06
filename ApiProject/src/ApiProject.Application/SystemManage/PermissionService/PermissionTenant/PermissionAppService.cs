using Abp.Runtime.Session;
using ApiProject.Authorization.Roles;
using ApiProject.Command.PermissionManage;
using ApiProject.MultiTenancy;
using ApiProject.ObjectValues;
using ApiProject.Query.PermissionManage;
using ApiProject.Shared.DataTransfer.PermissionService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Exceptions;

namespace ApiProject.PermissionService.PermissionTenant
{
    public class PermissionAppService : IPermissionAppService
    {
        public const string TENANT = "TENANT";
        public const string PERMISSION = "PERMISSION";
        public const string ROLE = "ROLE";

        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public PermissionAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpGet]
        public async Task<List<PermissionInternalTreeDto>> GetPermissionMaximum()
        {
            // get all role 
            var data = await _unitOfWork.ToGetAllPermissionSystem(null);
            var tree = ProcessPermision(data.Select(s => s.Key).ToList());
            return tree;
        }

        [HttpGet]
        public async Task<List<PermissionInternalTreeDto>> GetPermissionByTenant(int? idTenant)
        {
            // kiểm tra tenant
            var tenant = await _unitOfWork.GetRepository<Tenant>()
                              .GetFirstOrDefaultAsync(predicate: m => m.Id == idTenant);
            if (tenant == null) throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);

            // get all role 
            var data = await _unitOfWork.ToGetAllPermissionSystem(idTenant);
            var tree = ProcessPermision(data.Select(s => s.Key).ToList());
            return tree;
        }

        [HttpGet]
        public async Task<List<string>> LoadPermissionTenantId(int? id)
        {
            //kiểm tra truyền vào
            if (id == null || id == 0)
            {
                throw new ClientException(TENANT, ERROR_DATA.DATA_NULL);
            }
            // kiểm tra tenant
            var tenant = await _unitOfWork.GetRepository<Tenant>()
                              .GetFirstOrDefaultAsync(predicate: m => m.Id == id);

            if (tenant == null) throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);
            // get all role
            var data = await _unitOfWork.ToGetAllPermissionSystemByRole(id);
            return data.Select(s => s.Key).ToList();
        }

        // Ngắt đệ quy dọc bằng đệ quy ngang
        private List<PermissionInternalTreeDto> ProcessPermision(List<string> input)
        {
            List<PermissionInternalTreeDto> treeItems = new();
            List<string> chainStart = new();
            // tách key đầu
            foreach (var s in input)
            {
                if (s.Length != 0 && s.IndexOf(".") == -1)
                    chainStart.Add(s);
                else
                    chainStart.Add(s[..s.IndexOf(".")]);
            }

            chainStart = chainStart.Distinct().ToList();
            // lấy dữ liệu từng key
            foreach (var chai in chainStart)
            {
                // cắt và lấy chuỗi còn lại theo key
                List<string> backData = new();
                foreach (var s in input.Where(m => m.StartsWith(chai)))
                {
                    if (s.Length != 0 && s.IndexOf(".") != -1)
                        backData.Add(s.Substring(s.IndexOf(".") + 1));
                }
                // lặp lại công việc cho đến hết
                treeItems.Add(new PermissionInternalTreeDto
                {
                    Key = chai,
                    Children = ProcessPermision(backData)
                });
            }
            //input.Select(s => s.Key[..s.Key.IndexOf(".")]);
            return treeItems;
        }

        //[HttpPut("{id:int}")]
        /// <summary>
        /// Cập nhật quyền hạn co một phân hệ
        /// Tất cả những permission gốc bị xóa sẽ kéo theo toàn bộ các permission trong role đó bị xóa theo
        /// </summary>
        [HttpPut]
        public async Task<int> UpdatePermissionForTenant(UpdatePermissionForTenantDto input)
        {
            //kiểm tra truyền vào
            if (input.Id == 0)
            {
                throw new ClientException(TENANT, ERROR_DATA.DATA_NULL);
            }

            // kiểm tra tenant
            var tenant = await _unitOfWork.GetRepository<Tenant>()
                              .GetFirstOrDefaultAsync(predicate: m => m.Id == input.Id);

            if (tenant == null) throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);
            // cấp toàn quyền cho role null
            var dataRoleRoot = await _unitOfWork.ToGetPermissionByTenant(idTenant: input.Id, false);
            var listPermissionInsert = new List<string>();

            input.Permissins.ForEach(n =>
            {
                if (!dataRoleRoot.Any(m => m.Name == n))
                {
                    listPermissionInsert.Add(n);
                }
            });

            var lstPermissionDelete = new List<string>();

            dataRoleRoot.ForEach(n =>
            {
                if (!input.Permissins.Any(m => m == n.Name))
                {
                    lstPermissionDelete.Add(n.Name);
                }
            });
            // xoas toan bo quyen
            await _unitOfWork.RemoteRoleInPermission(input.Id, lstPermissionDelete);
            // xóa toàn bộ quyền trên role != null

            await _unitOfWork.InsertRoleInPermission(tenant.Id, (int)_abpSession.UserId, listPermissionInsert);
            return 1;
        }

        [HttpPut]
        public async Task<int> UpdatePermissionForRoleTenant(UpdatePermissionForRoleTenantDto input)
        {
            //Kiểm tra role
            //var roleTenant = await _unitOfWork.GetRepository<ApiProject.Authorization.Roles.Role>()
            //              .GetFirstOrDefaultAsync(predicate: m => m.Id == input.RoleId);

            var roleTenant = await _unitOfWork.GetRoleById(input.RoleId);

            if (roleTenant == null) throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);

            //kiểm tra truyền vào
            if (input.Id == 0)
            {
                throw new ClientException(TENANT, ERROR_DATA.DATA_NULL);
            }

            // kiểm tra tenant
            var tenant = await _unitOfWork.GetRepository<Tenant>()
                              .GetFirstOrDefaultAsync(predicate: m => m.Id == input.Id);

            if (tenant == null) throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);

            // get role basic of tenant
            var lstRoleRoot = await _unitOfWork.ToGetPermissionByTenant(idTenant: input.Id, false);
            // check roleinput and role basic
            foreach (var rol in input.Permissins)
            {
                if (!lstRoleRoot.Any(m => m.Name == rol) && rol.IndexOf(".") != -1)
                {
                    throw new ClientException(PERMISSION, ERROR_DATA.NOT_EXIST);
                }
            }

            //Cấp toàn quyền cho role null
            var currentRole = await _unitOfWork.ToGetPermissionByTenant(idTenant: input.Id, input.RoleId);

            var listPermissionInsert = new List<string>();
            input.Permissins.ForEach(n =>
            {
                if (!currentRole.Any(m => m.Name == n.Trim()))
                {
                    listPermissionInsert.Add(n);
                }
            });
            var lstPermissionDelete = new List<string>();

            currentRole.ForEach(n =>
            {
                if (!input.Permissins.Any(m => m == n.Name.Trim()))
                {
                    lstPermissionDelete.Add(n.Name);
                }
            });

            // xoas toan bo quyen
            await _unitOfWork.RemoteRoleInPermission(input.Id, input.RoleId, lstPermissionDelete);

            // xóa toàn bộ quyền trên role != null
            await _unitOfWork.InsertRoleInPermission(tenant.Id, input.RoleId, (int)_abpSession.UserId, listPermissionInsert);
            return 1;
        }

        [HttpGet]
        public async Task<List<string>> LoadPermissionMaximumByRoleTenantID(int? id, int? idRole)
        {
            //kiểm tra truyền vào
            if (id == null || id == 0 || idRole == null || idRole == 0)
            {
                throw new ClientException(TENANT, ERROR_DATA.DATA_NULL);
            }

            // kiểm tra tenant
            var tenant = await _unitOfWork.GetRepository<Tenant>()
                                          .GetFirstOrDefaultAsync(predicate: m => m.Id == id);
            if (tenant == null) throw new ClientException(TENANT, ERROR_DATA.NOT_EXIST);

            // kiểm tra Role
            var role = await _unitOfWork.GetRepository<Role>()
                                        .GetFirstOrDefaultAsync(predicate: m => m.Id == id && m.Id == idRole);
            if (tenant == null) throw new ClientException(ROLE, ERROR_DATA.NOT_EXIST);

            // get all permission by tenantid and roleid 
            var data = await _unitOfWork.ToGetAllPermissionSystem(id, idRole);
            return data.Select(s => s.Key).ToList();
        }

        [HttpGet]
        public async Task<List<PermissionInternalTreeDto>> LoadPermissionReview(int roleId, int tenantId)
        {
            var data = await LoadPermissionMaximumByRoleTenantID(tenantId,roleId);
            var tree = ProcessPermision(data.Select(s => s).ToList());
            return tree;
        }
    }
}
