using Abp.Runtime.Session;
using ApiProject.Command.TenantManager;
using ApiProject.Editions;
using ApiProject.MultiTenancy.Dto;
using ApiProject.ObjectValues;
using ApiProject.Query.TenantManager;
using ApiProject.Shared.Common;
using System.Threading.Tasks;
using System.Web.Http;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Any;
using Utils.Exceptions;

namespace ApiProject.MultiTenancy.MyTenant
{
    public class MyTenantAppService : IMyTenantAppService
    {
        private const string KEY = "TENANT";
        private const string ADMINISTRATOR = "Administrator";

        private readonly IUnitOfWork _unitOfWork;
        private readonly EditionManager _editionManager;
        private readonly IAbpSession _abpSession;
        public MyTenantAppService(IUnitOfWork unitOfWork, EditionManager editionManager, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _editionManager = editionManager;
            _abpSession = abpSession;
        }


        [HttpGet]
        public async Task<IPagedList<TenantBasicDto>> GetAll(SearchRequest input)
        {
            var data = await _unitOfWork.FromSqlPageListAsync<TenantBasicDto>(
                  sql: $@"
                            SELECT 
                            	ten.Id  AS Id, 
                            	ten.TenancyName AS TenancyName,
                            	ten.Name AS Name,
                            	ten.ConnectionString AS ConnectionString,
                            	ten.IsDeleted AS IsDeleted, 
                            	ten.IsActive AS IsActive,
                            	ten.LastModificationTime AS LastModificationTime, 
                            	ten.LastModifierUserId AS LastModifierUserId,
                            	au.Name  AS LastModifierUserName
                            FROM AbpTenants ten
                            LEFT JOIN AbpUsers au on au.Id  = ten.LastModifierUserId
                           {(input.ValuesSearch == null || input.ValuesSearch.Length == 0 || input.ValuesSearch[0] == null
                                                                            ? ""
                                                                            : $" WHERE ten.Name LIKE '%{input.ValuesSearch[0].ToUpper()}%' ")}
                            ORDER BY ten.IsDeleted ",
                  orderBy: "ten.Name",
                  pageIndex: input.PageIndex, pageSize: input.PageSize);
            return data.Item2.MapToPagedList(input.PageIndex, input.PageSize, data.Item1, 1);
        }

        [HttpPost]
        public async Task<int> CreateTenant([FromBody] TenantInsertDto tenantInput)
        {
            if (tenantInput.Name.ToUpper() == ADMINISTRATOR.ToUpper())
            {
                throw new ClientException(KEY, ERROR_DATA.UNAUTHORIZED);
            }

            // kiêm tra tên tenant
            if (await new TenantCommand().CheckTenantExist(_unitOfWork, tenantInput.Name))
            {
                throw new ClientException(KEY, ERROR_DATA.DATA_EXIST);
            }

            var dateTimeDB = await _unitOfWork.GetDateTime();

            ApiProject.MultiTenancy.Tenant tenant = new
            (
                name: tenantInput.Name,
                tenancyName: tenantInput.Name.FromViToConst()
            )
            {
                LastModifierUserId = _abpSession.GetUserId(),
                CreatorUserId = _abpSession.GetUserId(),
                IsActive = tenantInput.IsActive,
                IsDeleted = tenantInput.IsDeleted,
                LastModificationTime = dateTimeDB,
                CreationTime = dateTimeDB
            };

            var defaultEdition = await _editionManager.FindByNameAsync(EditionManager.DefaultEditionName);
            if (defaultEdition != null)
            {
                tenant.EditionId = defaultEdition.Id;
            }

            TenantQueries tenantQueries = new();
            await tenantQueries.Update(_unitOfWork, tenant);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpPost]
        public async Task<int> UpdateTenant([FromBody] TenantUpdateDto tenantInput)
        {
            if (tenantInput.Name.ToUpper() == ADMINISTRATOR.ToUpper())
            {
                throw new ClientException(KEY, ERROR_DATA.UNAUTHORIZED);
            }

            var dateTimeDB = await _unitOfWork.GetDateTime();
            var tenant = await _unitOfWork.GetRepository<Tenant>()
                               .GetFirstOrDefaultAsync(predicate: m => m.Id == tenantInput.Id);

            if (tenant == null) throw new ClientException(KEY, ERROR_DATA.DATA_NULL);
            if (tenant.Name.ToUpper() == ADMINISTRATOR.ToUpper()) throw new ClientException(KEY, ERROR_DATA.UNAUTHORIZED);
            if (tenantInput.Name.ToUpper() == ADMINISTRATOR.ToUpper()) throw new ClientException(KEY, ERROR_DATA.UNAUTHORIZED);
            if (await new TenantCommand().CheckTenantNameNewExist(_unitOfWork, tenant.Id, tenantInput.Name))
                throw new ClientException(KEY, ERROR_DATA.DATA_EXIST);

            tenant.Name = tenantInput.Name;
            tenant.TenancyName = tenantInput.Name.FromViToConst();
            tenant.LastModifierUserId = _abpSession.GetUserId();
            tenant.CreatorUserId = _abpSession.GetUserId();
            tenant.IsActive = tenantInput.IsActive;
            tenant.IsDeleted = tenantInput.IsDeleted;
            tenant.LastModificationTime = dateTimeDB;
            tenant.CreationTime = dateTimeDB;

            var defaultEdition = await _editionManager.FindByNameAsync(EditionManager.DefaultEditionName);
            if (defaultEdition != null) tenant.EditionId = defaultEdition.Id;

            TenantQueries tenantQueries = new();
            await tenantQueries.Update(_unitOfWork, tenant);
            _unitOfWork.SaveChanges();

            return 1;
        }

    }
}
