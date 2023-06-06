using Abp.Authorization.Users;
using Abp.Runtime.Session;
using ApiProject.ObjectValues;
using ApiProject.Shared.Common;
using ApiProject.Shared.DataTransfer.ProductAttribute;
using ApiProject.Shared.DataTransfer.SupplierFollow;
using ApiProject.Shared.Entitys;
using ApiProject.UL;
using DocumentFormat.OpenXml.Wordprocessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using UnitOfWork.Collections;
using Utils.Exceptions;

namespace ApiProject.Administrators.SupplierFollowAdminService
{
    public class SupplierFollowAdminAppService : ISupplierFollowAdminAppService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public SupplierFollowAdminAppService(IUnitOfWork unitOfWork, IAbpSession abpSession)
        {
            _unitOfWork = unitOfWork;
            _abpSession = abpSession;
        }

        public Task<SupplierFollowDetailDto> GetDetail(long id)
        {
            throw new NotImplementedException();
        }

        public Task<IPagedList<SupplierFollowDto>> GetPageList(SearchRequest input)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Insert(SupplierFollowInsertDto input)
        {
            // kiểm tra dữ liệu đầu vào
            if (input == null) throw new ClientException("input", ERROR_DATA.DATA_NULL);

            // kiểm tra tồn tại user and supplier
            var isExistsSupplier = await _unitOfWork.GetRepository<Shared.Entitys.SupplierEntity>()
                                                    .ExistsAsync(f => f.Id == input.SupplierId && f.IsActive == true);
            if (isExistsSupplier) throw new ClientException("Supplier", ERROR_DATA.DATA_NULL);
            if (_abpSession.UserId == null || _abpSession.UserId == 0) throw new ClientException("User", ERROR_DATA.DATA_NULL);

            // kiểm tra trường hợp không thể follow
            var supplierMappingActive = await _unitOfWork.GetRepository<Shared.Entitys.SupplierMappingEntity>()
                                                         .GetAllAsync(g => g.SupplierId == input.SupplierId
                                                                        && g.UserAccountId == _abpSession.UserId
                                                                        && g.IsDeleted == false && g.IsActive == true);
            if (supplierMappingActive.Count != 0) throw new ClientException("productAttribute", ERROR_DATA.DATA_NULL);

            // kiểm tra tồn tại bản ghi
            var isExists = await _unitOfWork.GetRepository<Shared.Entitys.SupplierFollowEntity>()
                                            .ExistsAsync(e => e.UserAccountId == _abpSession.UserId
                                                           && e.SupplierId == input.SupplierId);
            if (isExists) throw new ClientException("SupplierFollow", ERROR_DATA.DATA_EXIST);

            if (!Enum.IsDefined(typeof(SupplierFollowUL), input.Status)) throw new ClientException("Status", ERROR_DATA.DATA_NOT_EXIST);

            if (input.StarGold < 1 && input.StarGold > 5) throw new ClientException("StarGold", ERROR_DATA.UNSATISFACTORY);

            // tiến hành thêm mới
            _unitOfWork.GetRepository<Shared.Entitys.SupplierFollowEntity>().Insert(new Shared.Entitys.SupplierFollowEntity
            {
                SupplierId = input.SupplierId,
                UserAccountId = (long)_abpSession.UserId,
                Status = (int)input.Status,
                StarGold = input.StarGold,
                EvaluateUser = input.EvaluateUser,
                IsActive = input.IsActive,
                CreatorUserId = _abpSession.UserId
            });
            _unitOfWork.SaveChanges();

            return 1;
        }

        public Task<int> Remove(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Update(SupplierFollowUpdateDto input)
        {
            // kiểm tra input
            if (input == null) throw new ClientException("input", ERROR_DATA.DATA_NULL);

            // kiểm tra tồn tại user and supplier
            var isExistsSupplier = await _unitOfWork.GetRepository<Shared.Entitys.SupplierEntity>()
                                                    .ExistsAsync(f => f.Id == input.SupplierId && f.IsActive == true);
            if (isExistsSupplier) throw new ClientException("Supplier", ERROR_DATA.DATA_NULL);
            if (_abpSession.UserId == null || _abpSession.UserId == 0) throw new ClientException("User", ERROR_DATA.DATA_NULL);

            // kiểm tra trường hợp không thể follow
            var supplierMappingActive = await _unitOfWork.GetRepository<Shared.Entitys.SupplierMappingEntity>()
                                                         .GetAllAsync(g => g.SupplierId == input.SupplierId
                                                                        && g.UserAccountId == _abpSession.UserId
                                                                        && g.IsDeleted == false && g.IsActive == true);
            if (supplierMappingActive.Count != 0) throw new ClientException("productAttribute", ERROR_DATA.DATA_NULL);

            // kiểm tra tồn tại bản ghi
            var supplierFollowEntity = await _unitOfWork.GetRepository<Shared.Entitys.SupplierFollowEntity>()
                                            .GetFirstOrDefaultAsync(predicate: e => e.UserAccountId == _abpSession.UserId
                                                                                 && e.SupplierId == input.SupplierId);
            if (supplierFollowEntity == null) throw new ClientException("SupplierFollow", ERROR_DATA.DATA_EXIST);

            if (!Enum.IsDefined(typeof(SupplierFollowUL), input.Status)) throw new ClientException("Status", ERROR_DATA.DATA_NOT_EXIST);

            if (input.StarGold < 1 && input.StarGold > 5) throw new ClientException("StarGold", ERROR_DATA.UNSATISFACTORY);

            // tiến hành thêm mới
            supplierFollowEntity.Status = (int)input.Status;
            supplierFollowEntity.StarGold = input.StarGold;
            supplierFollowEntity.EvaluateUser = input.EvaluateUser;
            supplierFollowEntity.IsActive = input.IsActive;
            supplierFollowEntity.LastModifierUserId = _abpSession.UserId;

            _unitOfWork.GetRepository<Shared.Entitys.SupplierFollowEntity>().Update(supplierFollowEntity);
            _unitOfWork.SaveChanges();

            return 1;
        }
    }
}
