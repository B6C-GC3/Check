using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Role;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;

namespace ApiProject.Command.RoleManage
{
    public static class RoleTenantCommand
    {
        // load role for user create or update

        public static async Task<IPagedList<RopeTenantDictionaryDto>> LoadRoleForUser(this IUnitOfWork _unitOfWork, SearchRequest input)
        {
            var data = await _unitOfWork.FromSqlPageListAsync<RopeTenantDictionaryDto>(
                 sql: $@"
                        SELECT 
	                        ar.Id  AS Id,
	                        ar.DisplayName AS Value
                        FROM AbpRoles ar 
                        WHERE ar.TenantId is NOT NULL AND ar.TenantId = {input.ValuesSearch[0]}
                        {(input.ValuesSearch == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[1] == null
                        ? ""
                        : $" AND ar.Name LIKE '%{input.ValuesSearch[1].ToUpper()}%' ")}
                        AND ar.IsDeleted = 0
                        ORDER BY ar.DisplayName ",
                 orderBy: "Value",
                 pageIndex: input.PageIndex, pageSize: input.PageSize);
            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }

        public static async Task<CountRow> CheckRoleTenantForUser(this IUnitOfWork _unitOfWork, int tenantId, List<int> roleIds)
        {
            if (roleIds.Count == 0)
                return new CountRow { Count = 0 };
            var processNameRemote = JsonConvert.SerializeObject(roleIds);

            return (await _unitOfWork.FromSqlAsync<CountRow>
              (@$"
                SELECT COUNT(*) AS Count
                FROM AbpRoles ar 
                WHERE ar.TenantId = {tenantId} AND ar.Id IN ({processNameRemote
                                                              .Remove(0, 1)
                                                              .Remove(processNameRemote.Length - 2, 1).Replace("\"", "'")})
              "))
              .FirstOrDefault();
        }
    }
}
