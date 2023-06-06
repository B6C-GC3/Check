using ApiProject.Authorization.Roles;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.PermissionService;
using ApiProject.Shared.DataTransfer.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.Command.PermissionManage
{
    public static class PermissionOverallCommand
    {
        public static async Task<RoleTenantDto> GetRoleById(this IUnitOfWork _unitOfWork, int? idRole)
        {
            return (await _unitOfWork.FromSqlAsync<RoleTenantDto>($"SELECT ar.Id AS Id FROM AbpRoles ar WHERE ar.Id  = {idRole}")).FirstOrDefault();
        }
        public static async Task<List<StringModel>> ToGetAllPermissionSystem(this IUnitOfWork _unitOfWork, int? idTenant)
        {
            var data = await _unitOfWork.FromSqlAsync<StringModel>(
                             sql: $@"
                                    SELECT 
                                        ap.Name AS [Key]
                                    FROM AbpPermissions ap 
                                    WHERE ap.TenantId {(idTenant == null ? "IS NULL" : $"= {idTenant}")}  AND  ap.IsGranted  = 1 AND ap.UserId IS NULL
                             ");
            return data;
        }

        public static async Task<List<StringModel>> ToGetAllPermissionSystemByRole(this IUnitOfWork _unitOfWork, int? idTenant)
        {
            var data = await _unitOfWork.FromSqlAsync<StringModel>(
                             sql: $@"
                                    SELECT 
                                        ap.Name AS [Key]
                                    FROM AbpPermissions ap 
                                    WHERE ap.TenantId {(idTenant == null ? "IS NULL" : $"= {idTenant}")} AND ap.RoleId IS NULL  AND  ap.IsGranted  = 1 AND ap.UserId IS NULL
                             ");
            return data;
        }

        public static async Task<List<StringModel>> ToGetAllPermissionSystem(this IUnitOfWork _unitOfWork, int? idTenant, int? idRole)
        {
            var data = await _unitOfWork.FromSqlAsync<StringModel>(
                             sql: $@"
                                    SELECT 
                                        ap.Name AS [Key]
                                    FROM AbpPermissions ap 
                                    WHERE ap.TenantId {(idTenant == null ? "IS NULL" : $"= {idTenant}")}  
                                    AND ap.RoleId {(idRole == null ? "IS NULL" : $"= {idRole}")}  
                                    AND  ap.IsGranted  = 1 
                                    AND ap.UserId IS NULL
                             ");
            return data;
        }

        public static async Task<List<PermissionByTenantDto>> ToGetPermissionByTenant(this IUnitOfWork _unitOfWork,
                                                                                                   int idTenant,
                                                                                                   bool isRoleId)
        {
            var data = await _unitOfWork.FromSqlAsync<PermissionByTenantDto>(
                             sql: $@"
                                    SELECT 
                                        ap.Id AS Id,
                                        ap.Discriminator AS Discriminator,
                                        ap.IsGranted AS IsGranted,
                                        ap.Name AS Name,
                                        ap.TenantId AS TenantId,
                                        ap.RoleId AS RoleId,
                                        ap.UserId AS UserId 
                                    FROM AbpPermissions ap 
                                    WHERE ap .TenantId = {idTenant} 
                                      AND ap.RoleId {(isRoleId == true ? "IS NOT NULL" : "IS NULL")}  
                                      AND ap.IsGranted  = 1 
                                      AND ap.UserId IS NULL
                             ");
            return data;
        }

        public static async Task<List<PermissionByTenantDto>> ToGetPermissionByTenant(this IUnitOfWork _unitOfWork,
                                                                                                  int idTenant,
                                                                                                  int isRoleId)
        {
            var data = await _unitOfWork.FromSqlAsync<PermissionByTenantDto>(
                             sql: $@"
                                    SELECT 
                                        ap.Id AS Id,
                                        ap.Discriminator AS Discriminator,
                                        ap.IsGranted AS IsGranted,
                                        ap.Name AS Name,
                                        ap.TenantId AS TenantId,
                                        ap.RoleId AS RoleId,
                                        ap.UserId AS UserId 
                                    FROM AbpPermissions ap 
                                    WHERE ap .TenantId = {idTenant} 
                                      {(isRoleId != 0 ? $"AND ap.RoleId = {isRoleId}" : "")}
                                      AND ap.IsGranted  = 1 
                                      AND ap.UserId IS NULL
                             ");
            return data;
        }
    }
}
