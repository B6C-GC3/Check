using Abp.Application.Services;
using Abp.Runtime.Session;
using ApiProject.Authorization.Users;
using ApiProject.MappingExtention;
using ApiProject.ObjectValues;
using ApiProject.Shared.DataTransfer.Supplier;
using ApiProject.Shared.Entitys;
using ApiProject.UL;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitOfWork;
using Utils.Any;
using Utils.Exceptions;
using Utils.Security;

namespace ApiProject.Supplier.RegisterAccountService
{
    public class RegisterSupplierAccountAppService : IRegisterSupplierAccountAppService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAbpSession _abpSession;

        public RegisterSupplierAccountAppService(IAbpSession abpSession, IUnitOfWork unitOfWork)
        {
            _abpSession = abpSession;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<SupplierRegisterDto> GetInfoSupplier()
        {
            SupplierRegisterDto result = new();

            var supplierMapping = await _unitOfWork.GetRepository<SupplierMappingEntity>()
                                                   .GetFirstOrDefaultAsync(predicate: p => p.UserAccountId == _abpSession.UserId
                                                                                   && p.Hierarchical == (int)SupplierHierarchical.BOSS);

            if (supplierMapping != null)
            {
                var infoSupplier = await _unitOfWork.GetRepository<SupplierEntity>()
                                                    .GetFirstOrDefaultAsync(predicate: p => p.Id == supplierMapping.SupplierId);

                if (infoSupplier != null)
                {
                    result = MappingData.InitializeAutomapper().Map<SupplierRegisterDto>(infoSupplier);
                    result.Hierarchical = supplierMapping.Hierarchical;
                }
            }

            return result;
        }

        [HttpPost]
        public async Task<int> RegisterOrUpdateSupplierService([FromBody]SupplierRegisterDto input)
        {
            // kiểm tra nhà cung cấp dựa trên id Boss trên mapping => thao tác hoàn tất khi nhà cung cấp sẵn sàng được kích hoạt
            var supplierMapping = await _unitOfWork.GetRepository<SupplierMappingEntity>()
                                                   .GetFirstOrDefaultAsync(predicate: p => p.UserAccountId == _abpSession.UserId
                                                                                   && p.Hierarchical == (int)SupplierHierarchical.BOSS);

            if (supplierMapping == null) // chưa có thông tin => insert 
            {
                // kiểm tra thông tin với DB
                var existsSupplier = await _unitOfWork.GetRepository<SupplierEntity>()
                                                      .ExistsAsync(p => p.NumberPhone == input.NumberPhone || p.Email == input.Email
                                                                     || p.NameShop == input.NameShop || p.LinkShop == input.LinkShop);

                if (existsSupplier) throw new ClientException("ERROR_SUPPLIER", ERROR_DATA.INSERT_FAIL); // thông tin supplier chưa dk mapping
                // insert bảng supplier
                var insertData = MappingData.InitializeAutomapper().Map<SupplierEntity>(input);
                // mã hóa password
                insertData.Status = (int)STATUS_SUPPLIER_MAPPING.PENDING;
                var supplierEntityInsert = _unitOfWork.GetRepository<SupplierEntity>()
                                                      .Insert(insertData);
                _unitOfWork.SaveChanges();
                // insert bảng supplier Mapping
                if (supplierEntityInsert == null) throw new ClientException("ERROR_SUPPLIER_MAPPING", ERROR_DATA.INSERT_FAIL);

                var resul = _unitOfWork.GetRepository<SupplierMappingEntity>()
                                       .Insert(new SupplierMappingEntity
                                       {
                                           SupplierId = supplierEntityInsert.Id,
                                           UserAccountId = (long)_abpSession.UserId,
                                           Hierarchical = (int)SupplierHierarchical.BOSS,
                                           IsActive = false,
                                           IsDeleted = false,
                                           CreatorUserId = _abpSession.UserId,
                                           LastModifierUserId = _abpSession.UserId
                                       });
                _unitOfWork.SaveChanges();
                return 1;
            }
            else // đã có thông tin => cập nhật
            {
                // kiểm tra mapping
                var supplierUpdate = await _unitOfWork.GetRepository<SupplierEntity>()
                                                      .GetFirstOrDefaultAsync(predicate: p => p.Id == supplierMapping.SupplierId);
                if (supplierUpdate != null)
                {
                    // kiểm tra thông tin với DB
                    var existsSupplier = await _unitOfWork.GetRepository<SupplierEntity>()
                                                          .GetAllAsync(p => p.NumberPhone == input.NumberPhone || p.Email == input.Email
                                                                         || p.NameShop == input.NameShop || p.LinkShop == input.LinkShop);

                    if (existsSupplier.Count > 1) throw new ClientException("SUPPLIER", ERROR_DATA.DATA_EXIST);

                    // update bảng supplier
                    var updateData = supplierUpdate;

                    if (existsSupplier.Count == 1 && existsSupplier.FirstOrDefault().Id != supplierMapping.SupplierId)
                        throw new ClientException("SUPPLIER", ERROR_DATA.DATA_EXIST);

                    // mã hóa password
                    updateData.Status = (int)STATUS_SUPPLIER_MAPPING.PENDING;
                    updateData.CompanyVat = input.CompanyVat;
                    updateData.NumberPhone = input.NumberPhone;
                    updateData.Email = input.Email;
                    updateData.NameShop = input.NameShop;
                    updateData.LinkShop = input.LinkShop;
                    updateData.Adress = input.Adress;
                    updateData.Url = input.Url;
                    updateData.DefaultLanguageId = input.DefaultLanguageId;

                    _unitOfWork.GetRepository<SupplierEntity>().Update(updateData);
                    _unitOfWork.SaveChanges();

                    return 1;
                }
            }
            // kiểm tra thông tin nhập vào với thông tin DB Khác Id Boss
            return 1;
        }
    }
}
