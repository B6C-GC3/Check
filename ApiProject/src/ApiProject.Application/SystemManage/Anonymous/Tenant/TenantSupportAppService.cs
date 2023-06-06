using Abp.Runtime.Session;
using ApiProject.Anonymous.Tenant.Dto;
using ApiProject.Editions;
using ApiProject.Query.TenantManager;
using ApiProject.Shared.Common;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Any;

namespace ApiProject.Anonymous.Tenant
{
    [Route("/api/v1/[controller]/[action]")]
    public class TenantSupportAppService : ITenantSupportAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly EditionManager _editionManager;
        private readonly IAbpSession _abpSession;
        public TenantSupportAppService(IUnitOfWork unitOfWork, EditionManager editionManager, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _editionManager = editionManager;
            _abpSession = abpSession;
        }

        [HttpGet]
        public async Task<IPagedList<TenantCommonDto>> GetAll(SearchRequest input)
        {
            var data = _unitOfWork.FromSqlPageList<TenantCommonDto>(
                       sql: $"SELECT ten.Name, ten.TenancyName " +
                            $"FROM AbpTenants ten " +
                            $"WHERE ten.IsActive =1 AND ten.IsDeleted = 0 {(input.ValuesSearch == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[0] == null
                                                                            ? ""
                                                                            : $"AND ten.Name LIKE '%{input.ValuesSearch[0].ToUpper()}%'")}",
                       orderBy: "ten.Name",
                       pageIndex: input.PageIndex, pageSize: input.PageSize, totalCount: out int totalcount);
            return data.MapToPagedList(input.PageIndex, input.PageSize, totalcount, 1);
        }

        [HttpGet]
        public async Task<IPagedList<TenantCommonIdDto>> GetAllId(SearchRequest input)
        {
            var data = _unitOfWork.FromSqlPageList<TenantCommonIdDto>(
                       sql: $"SELECT ten.Id, ten.Name, ten.TenancyName " +
                            $"FROM AbpTenants ten " +
                            $"WHERE ten.IsActive =1 AND ten.IsDeleted = 0 {(input.ValuesSearch == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[0] == null
                                                                            ? ""
                                                                            : $"AND ten.Name LIKE '%{input.ValuesSearch[0].ToUpper()}%'")}",
                       orderBy: "ten.Name",
                       pageIndex: input.PageIndex, pageSize: input.PageSize, totalCount: out int totalcount);
            return data.MapToPagedList(input.PageIndex, input.PageSize, totalcount, 1);
        }
    }
}
