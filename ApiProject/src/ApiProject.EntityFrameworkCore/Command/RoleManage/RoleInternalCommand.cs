using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;

namespace ApiProject.Command.RoleManage
{
    public static class RoleInternalCommand
    {
        public static async Task<IPagedList<RoleTenantReadDto>> ToGetRoleSql(this IUnitOfWork _unitOfWork, SearchRequest input, int? tenantId)
        {
            var data = await _unitOfWork.FromSqlPageListAsync<RoleTenantReadDto>(
                 sql: $@"
                            SELECT 
                            	  ar.Id AS Id
                            	 ,ar.DisplayName AS DisplayName
                            	 ,ar.IsDefault AS IsDefault
                            	 ,ar.IsDeleted AS IsDeleted
                            	 ,ar.IsStatic AS  IsStatic
                            	 ,ar.Name AS Name
                            	 ,ar.TenantId AS TenantId
                            	 ,at2.Name AS TenantName
                            	 ,ar.Description AS Description
                            	 ,ar.LastModificationTime AS LastModificationTime
                            	 ,ar.LastModifierUserId AS LastModifierUserId
                            	 ,au.Name AS LastModifierUserName
                            FROM  AbpRoles ar
                            LEFT JOIN AbpTenants at2 ON ar.TenantId = at2.Id
                            LEFT JOIN AbpUsers au ON au.Id = ar.LastModifierUserId
                            WHERE ar.TenantId is NOT NULL AND ar.TenantId = {tenantId}
                            {(input.ValuesSearch == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[0] == null
                            ? ""
                            : $" AND ar.Name LIKE '%{input.ValuesSearch[0].ToUpper()}%' ")}
                            ORDER BY ar.IsDeleted ",
                 orderBy: "ar.Name",
                 pageIndex: input.PageIndex, pageSize: input.PageSize);
            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }
       // public static async
    }
}
