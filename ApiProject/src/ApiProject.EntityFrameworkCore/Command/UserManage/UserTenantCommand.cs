using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;

namespace ApiProject.Command.UserManage
{
    public static class UserTenantCommand
    {
        public static async Task<IdentityKey<Int64>> CheckUserAccount(this IUnitOfWork _unitOfWork, string email, string userName, string phone, int tenantId)
        {
            return (await _unitOfWork.FromSqlAsync<IdentityKey<Int64>>
                (@$"
                SELECT
                    au.Id AS Id
                FROM AbpUsers au
                WHERE au.EmailAddress = '{email}'
                OR au.UserName = '{userName}'
                OR(au.PhoneNumber = '{phone}' OR au.PhoneNumber IS NULL)
                AND au.TenantId = {tenantId} "))
                .FirstOrDefault();
        }

        public static async Task<IPagedList<UserTenantReviewDto>> GetUserByTenantId(this IUnitOfWork _unitOfWork, SearchRequest input)
        {
            var data = await _unitOfWork.FromSqlPageListAsync<UserTenantReviewDto>(
                sql: $@"
                         SELECT 
                             au.Id AS Id, 
                             au.CreationTime AS CreationTime, 
                             au.CreatorUserId AS CreatorUserId , 
                             au2.UserName  AS CreatorUserName , 
                             au.LastModificationTime AS LastModificationTime, 
                             au.LastModifierUserId AS LastModifierUserId, 
                             au3.UserName AS LastModifierUserName, 
                             au.UserName AS UserName, 
                             au.EmailAddress AS EmailAddress, 
                             au.Name AS Name, 
                             au.Surname AS Surname,  
                             au.EmailConfirmationCode AS EmailConfirmationCode,
                             au.LockoutEndDateUtc AS LockoutEndDateUtc, 
                             au.AccessFailedCount AS AccessFailedCount, 
                             au.IsLockoutEnabled AS IsLockoutEnabled, 
                             au.PhoneNumber AS PhoneNumber, 
                             au.IsPhoneNumberConfirmed AS IsPhoneNumberConfirmed,
                             au.IsTwoFactorEnabled AS IsTwoFactorEnabled, 
                             au.IsEmailConfirmed AS IsEmailConfirmed, 
                             au.IsActive AS IsActive
                         FROM AbpUsers au
                         LEFT JOIN AbpUsers au2 ON au2.Id = au.CreatorUserId
                         LEFT JOIN AbpUsers au3 ON au3.Id = au.LastModifierUserId
                         WHERE au.TenantId = {input.ValuesSearch[0]} AND au.IsDeleted = 0
                           {(input.ValuesSearch == null || input.ValuesSearch.Length <= 1 || input.ValuesSearch[1] == null
                            ? ""
                            : $" AND au.UserName LIKE '%{input.ValuesSearch[0].ToUpper()}%' ")}
                            ORDER BY au.CreationTime ",
                orderBy: "au.CreationTime",
                pageIndex: input.PageIndex, pageSize: input.PageSize);
            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }
    }
}
