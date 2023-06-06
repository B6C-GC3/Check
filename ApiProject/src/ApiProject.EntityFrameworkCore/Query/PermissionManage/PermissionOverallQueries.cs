using ApiProject.Shared.DataTransfer.PermissionService;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;

namespace ApiProject.Query.PermissionManage
{
    public static class PermissionOverallQueries
    {
        public static async Task<int> RemoteRoleInPermission(this IUnitOfWork _unitOfWork, int idTenant, List<string> nameRemote)
        {
            if (nameRemote.Count == 0)
                return 0;
            var processNameRemote = JsonConvert.SerializeObject(nameRemote);
            return await _unitOfWork.FromQueriesSqlAsync(@$"DELETE FROM AbpPermissions 
                                                                   WHERE TenantId = {idTenant} 
                                                                   AND Name IN ({processNameRemote
                                                                                 .Remove(0, 1)
                                                                                 .Remove(processNameRemote.Length - 2, 1).Replace("\"", "'")})");
        }

        public static async Task<int> RemoteRoleInPermission(this IUnitOfWork _unitOfWork, int idTenant,int idRole, List<string> nameRemote)
        {
            if (nameRemote.Count == 0)
                return 0;
            var processNameRemote = JsonConvert.SerializeObject(nameRemote);
            return await _unitOfWork.FromQueriesSqlAsync(@$"DELETE FROM AbpPermissions 
                                                                   WHERE TenantId = {idTenant} 
                                                                   AND RoleId = {idRole}
                                                                   AND Name IN ({processNameRemote
                                                                                 .Remove(0, 1)
                                                                                 .Remove(processNameRemote.Length - 2, 1).Replace("\"", "'")})");
        }

        //INSERT INTO ProcessDb.dbo.AbpPermissions (CreationTime, CreatorUserId, Discriminator, IsGranted, Name, TenantId, RoleId, UserId) VALUES('2022-08-20 16:22:59.903', NULL, N'RolePermissionSetting', 1, N'Pages.Users', 6, NULL, NULL);

        public static async Task<int> InsertRoleInPermission(this IUnitOfWork _unitOfWork, int idTenant, int idCreate, List<string> namePermission)
        {
            if (namePermission.Count == 0)
                return 0;

            StringBuilder sql = new();
            sql.AppendLine(@$"INSERT INTO ProcessDb.dbo.AbpPermissions 
                            (CreationTime, CreatorUserId, Discriminator, IsGranted, Name, TenantId, RoleId, UserId)
                          VALUES ");

            var time = (await _unitOfWork.GetDateTime()).ToString();
            int i = 1;
            foreach (var item in namePermission)
            {
                if (namePermission.Count == i)
                {
                    sql.AppendLine(@$"('{time}', {idCreate}, N'RolePermissionSetting', 1, N'{item}', {idTenant}, NULL, NULL);");
                }
                else
                {
                    sql.AppendLine(@$"('{time}', {idCreate}, N'RolePermissionSetting', 1, N'{item}', {idTenant}, NULL, NULL),");
                    i++;
                }
            }

            return await _unitOfWork.FromQueriesSqlAsync(sql.ToString());
        }

        public static async Task<int> InsertRoleInPermission(this IUnitOfWork _unitOfWork, int idTenant,int idRole, int idCreate, List<string> namePermission)
        {
            if (namePermission.Count == 0)
                return 0;

            StringBuilder sql = new();
            sql.AppendLine(@$"INSERT INTO ProcessDb.dbo.AbpPermissions 
                            (CreationTime, CreatorUserId, Discriminator, IsGranted, Name, TenantId, RoleId, UserId)
                          VALUES ");

            var time = (await _unitOfWork.GetDateTime()).ToString();
            int i = 1;

            foreach (var item in namePermission)
            {
                if (namePermission.Count == i)
                {
                    sql.AppendLine(@$"('{time}', {idCreate}, N'RolePermissionSetting', 1, N'{item}', {idTenant}, {idRole}, NULL);");
                }
                else
                {
                    sql.AppendLine(@$"('{time}', {idCreate}, N'RolePermissionSetting', 1, N'{item}', {idTenant}, {idRole}, NULL),");
                    i++;
                }
            }

            return await _unitOfWork.FromQueriesSqlAsync(sql.ToString());
        }
    }
}
