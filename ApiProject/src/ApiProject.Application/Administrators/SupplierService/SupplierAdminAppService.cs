using Abp.Localization;
using Abp.Runtime.Session;
using ApiProject.MappingExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.Supplier;
using ApiProject.Shared.Entitys;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Administrators.SupplierService
{
    public class SupplierAdminAppService : ISupplierAdminAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public SupplierAdminAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpGet]
        public async Task<IPagedList<SupplierInfoDto>> GetPagelist(SearchRequest input)
        {
            var data = await _unitOfWork.GetRepository<SupplierEntity>()
                                        .GetPagedListAsync(predicate: p => p.NameShop.ToUpper().Equals(input.ValuesSearch[0].ToUpper()),
                                                           pageIndex: input.PageIndex,
                                                           pageSize: input.PageSize);

            var lag = (await _unitOfWork.GetRepository<ApplicationLanguage>().GetAllAsync()).ToList();

            var result = data.Items.Select(s =>
            {
                var res = MappingData.InitializeAutomapper().Map<SupplierInfoDto>(s);
                res.DefaultLanguageName = lag.FirstOrDefault(w => w.Id == res.DefaultLanguageId)?.DisplayName;
                return res;
            })
            .MapToPagedList(pageIndex: data.PageIndex,
                            pageSize: data.PageSize,
                            totalCount: data.TotalCount,
                            indexFrom: data.IndexFrom);

            return result;
        }

        [HttpPost]
        public async Task<int> ChangeStatus(SupplierChangeStatus input)
        {
            var data = await _unitOfWork.GetRepository<SupplierEntity>()
                                        .GetFirstOrDefaultAsync(predicate: f => f.Id == input.Id);

            if (data == null) throw new ClientException("SUPPLIER", ERROR_DATA.DATA_NOT_EXIST);

            data.Status = (int)input.Status;
            data.IsActive = true;
            data.IsDeleted = false;
            data.LastModifierUserId = _abpSession.UserId;

            _unitOfWork.GetRepository<SupplierEntity>().Update(data);
            _unitOfWork.SaveChanges();

            return 1;
        }

    }
}
