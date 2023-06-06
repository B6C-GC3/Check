using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.CategoryProduct;
using ApiProject.Shared.DataTransfer.ProductAttributeValue;
using UnitOfWork;
using UnitOfWork.Collections;
using DocumentFormat.OpenXml.Drawing.Charts;
using NPOI.SS.Formula.Functions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiProject.Query.ProductAttributeManager
{
    public static class ProductAttributeCmd
    {
        public static async Task<IPagedList<ProductAttributeValueSupplier>> LoadData(this IUnitOfWork _unitOfWork, SearchRequest input, long supplierId)
        {
            String sql = String.Format(@"SELECT 
                                    	att.Id AS 'AttributeId',
                                    	att.Name AS 'NameAttribute',
                                    	att.Types AS 'TypesAttribute',
                                    	att.CategoryProductId  AS 'CategoryId',
                                    	cp.Name AS 'CategoryName',
                                    	pav.Id AS 'Id',
                                    	pav.[Values] AS 'Value',
                                    	pav.IsActive AS 'IsActive',
                                    	pav.IsDeleted AS 'IsDelete',
                                    	pav.LastModificationTime AS 'LastModificationTime',
                                    	pav.LastModifierUserId AS 'LastModifierUserId',
                                    	aua.UserName AS 'LastModifierUserName',
                                    	(SELECT COUNT(*) FROM Product p WHERE p.Fragile = pav.Id) AS 'ProductCount'
                                    FROM [Attribute] att
                                        LEFT JOIN CategoryProduct cp ON att.CategoryProductId = cp.Id 
                                        INNER JOIN ProductAttributeValue pav ON att.Id = pav.AttributeId
                                        LEFT JOIN AbpUserAccounts aua ON pav.LastModifierUserId = aua.Id
                                    WHERE pav.LastModifierUserId IS NOT NULL  
                                        AND att.Types IN ({1}) 
                                        AND pav.SupplierId = {2}
                                        AND (pav.[Values] LIKE N'%{0}%' OR att.[Name] LIKE N'%{0}%')
                                    ", 
                           input.ValuesSearch[0], 
                           input.ValuesSearch[1],
                           supplierId);

            var data = await _unitOfWork.FromSqlPageListAsync<ProductAttributeValueSupplier>(
                sql: sql.ToString(),
                orderBy: "pav.[Values]",
                pageIndex: input.PageIndex, pageSize: input.PageSize);
            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }
    }
}
