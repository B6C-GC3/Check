using ApiProject.EntityFrameworkCore.Seed.Uow;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.CategoryProduct;
using ApiProject.Shared.DataTransfer.Role;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;

namespace ApiProject.Command.CategoryManage
{
    public static class CategorySimpleCmd
    {
        public static async Task<IPagedList<CategoryTableDto>> GetDataCmd(this IUnitOfWork _unitOfWork, SearchRequest input)
        {
            var data = await _unitOfWork.FromSqlPageListAsync<CategoryTableDto>(
                 sql: $@"
                        SELECT cp.Id AS ""Id""
                        	  ,cp.Name AS ""Name""
                        	  ,cp.Url AS ""Url"" 
                        	  ,cp.Icon AS ""Icon""
                        	  ,cp.[Level] AS ""Level"" 
                        	  ,cp.CategoryMain AS ""CategoryMainId"" 
                        	  ,(SELECT cp2.Name FROM CategoryProduct cp2 WHERE cp2.Id = cp.CategoryMain) AS ""CategoryMainName"" 
                        	  ,cp.NumberOrder AS ""NumberOrder"" 
                        	  ,cp.TenantId AS ""TenantId"" 
                              ,(SELECT at2.Name FROM AbpTenants at2 WHERE at2.Id = cp.TenantId) AS ""TenantName"" 
                        	  ,cp.IsActive AS ""IsActive"" 
                        FROM  CategoryProduct cp
                        WHERE cp.TenantId is NOT NULL 
                        AND cp.TenantId = {input.ValuesSearch[0]}
                        {(input.ValuesSearch == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[1] == null
                        ? ""
                        : $" AND cp.Name LIKE '%{input.ValuesSearch[1].ToUpper()}%' ")}
                        ORDER BY {(string.IsNullOrEmpty(input.PropertyOrder)
                        ? "cp.NumberOrder"
                        : $"cp.{(input.PropertyOrder)} {(input.ValueOrderBy ? "ASC" : "DESC")}")}",
                 orderBy: "NumberOrder",
                 pageIndex: input.PageIndex, pageSize: input.PageSize);
            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }

        public static async Task<bool> CheckCategoryName(this IUnitOfWork _unitOfWork, string name, string url, long categoryMain)
        {
            var data = await _unitOfWork.FromSqlAsync<CountRow>(
                sql: @$"SELECT COUNT(*)
                        FROM CategoryProducts cp
                        WHERE cp.Name LIKE N'{name}'
                           OR cp.Url LIKE N'{url}'
                           OR cp.CategoryMain = {categoryMain};");
            return data.FirstOrDefault().Count == 0;
        }


        public static async Task<List<SupplierCategoryDto>> LoadCategoryByTree(this IUnitOfWork _unitOfWork, string Id)
        {
            string sql = string.Format(@"
                                        WITH category_render (Id, Name, CategoryMain) AS (
                                           SELECT cp.Id, cp.Name, cp.CategoryMain
                                           FROM ProcessDb.dbo.CategoryProduct cp 
                                           WHERE cp.IsActive = 1 AND cp.Id IN ({0})
                                           UNION ALL
                                           SELECT cp.Id, cp.Name, cp.CategoryMain
                                           FROM CategoryProduct cp 
                                           INNER JOIN category_render cr 
                                           ON cp.CategoryMain = cr.Id
                                        )
                                        SELECT DISTINCT * FROM category_render c_r            
                                        ", Id);
            var data = await _unitOfWork.FromSqlAsync<SupplierCategoryDto>(sql: sql);
            return data;
        }
    }
}
