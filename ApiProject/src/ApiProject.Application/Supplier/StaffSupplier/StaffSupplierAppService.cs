using Abp.Authorization.Users;
using Abp.Runtime.Session;
using ApiProject.MappingExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.StaffSupplier;
using ApiProject.Shared.DataTransfer.Supplier;
using ApiProject.Shared.Entitys;
using ApiProject.UL;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Supplier.StaffSupplier
{
    public class StaffSupplierAppService : IStaffSupplierAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public StaffSupplierAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        [HttpGet]
        public async Task<IPagedList<StaffSupplierDto>> GetStaffPageList(SearchRequest input)
        {
            IPagedList<StaffSupplierDto> result = default;
            // lây thông tin gốc
            var data = await _unitOfWork.GetRepository<SupplierMappingEntity>()
                                        .GetPagedListAsync(predicate: p => p.SupplierId == Convert.ToInt64(input.ValuesSearch[0]),
                                                           pageIndex: input.PageIndex,
                                                           pageSize: input.PageSize);
            // lấy thông tin phụ
            var idsAccount = data.Items.Select(s => s.UserAccountId).ToList();
            var account = await _unitOfWork.GetRepository<UserAccount>()
                                           .GetAllAsync(predicate: p => idsAccount.Contains(p.Id));
            // map data
            result = data.Items.Select(s =>
            {
                var ac = account.FirstOrDefault(f => f.Id == s.UserAccountId);
                var a = MappingData.InitializeAutomapper().Map<StaffSupplierDto>(s);
                if (ac == null)
                {
                    a.Email = null;
                    a.UserName = null;
                }
                else
                {
                    a.Email = ac.EmailAddress;
                    a.UserName = ac.UserName;
                }

                return a;
            }).ToPagedList(pageIndex: data.PageIndex, pageSize: data.PageSize);

            return result;
        }

        [HttpDelete]
        public async Task<int> RemoveStaff(long id)
        {
            var data = await _unitOfWork.GetRepository<SupplierMappingEntity>()
                                        .GetFirstOrDefaultAsync(predicate: p => p.UserAccountId == id
                                                                        && p.Hierarchical != (long)SupplierHierarchical.BOSS);

            if (data == null) throw new ClientException("ACCOUNT", ERROR_DATA.DATA_NULL);

            data.IsActive = false;
            data.IsDeleted = true;

            _unitOfWork.GetRepository<SupplierMappingEntity>().Update(data);
            _unitOfWork.SaveChanges();

            return 1;
        }

        [HttpPut]
        public async Task<int> UpdateBoss(long id)
        {
            // get data boss and staff 
            var data = (await _unitOfWork.GetRepository<SupplierMappingEntity>()
                                         .GetAllAsync(predicate: p => (p.UserAccountId == id && p.Hierarchical != (int)SupplierHierarchical.BOSS)
                                                                   || (p.UserAccountId != id && p.Hierarchical == (int)SupplierHierarchical.BOSS))
                       ).ToList();

            if (data.Count != 2) throw new ClientException("ACCOUNT", ERROR_DATA.DATA_NULL);

            data = data.Select(s =>
            {
                s.Hierarchical = (s.Hierarchical == (int)SupplierHierarchical.BOSS
                                 ? (int)SupplierHierarchical.STAFF
                                 : (int)SupplierHierarchical.BOSS);
                return s;
            }).ToList();

            _unitOfWork.GetRepository<SupplierMappingEntity>().Update(data);
            _unitOfWork.SaveChanges();

            return 1;
        }
    }
}
