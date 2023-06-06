import { Key } from 'react';
import { PagedResultDto } from '../../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../../services/dto/responsesResource';
import { SearchRequest } from '../../../../services/dto/searchRequest ';
import http from '../../../../services/httpService';
import { PermissionUri } from '../../../../services/urlApi/permisionUri';
import { RoleTenantBasicDto, RoleTenantReadDto } from './dtos/permissionTenantDto';
import { PermissionTenantTreeDto, TenantBasicDto, TenantInsertDto, TenantUpdateDto, UpdatePermissionForTenantDto, UpdatePermissionForTenantRoleDto } from './dtos/tenantDto';
import { RoleTenantDictionaryDto, UserTenantInsertUpdateDto, UserTenantReviewDto } from './dtos/userTenantDto';

class TenantAdminService {
    public async GetAllTenant(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<TenantBasicDto>>> {
        let rs = await http.get(PermissionUri.SYSTEMTENANT_GETALL,
            {
                params: {
                    propertySearch: input.propertySearch,
                    valuesSearch: input.valuesSearch,
                    propertyOrder: input.propertyOrder,
                    valueOrderBy: input.valueOrderBy,
                    pageIndex: input.pageIndex,
                    pageSize: input.pageSize
                }
            });
        return rs ? rs.data : rs;
    }

    public async InsertTenant(input: TenantInsertDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post(PermissionUri.SYSTEMTENANT_CREATETENANT, input);
        return rs ? rs.data : rs;
    }

    public async UpdateTenant(input: TenantUpdateDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.put(PermissionUri.SYSTEMTENANT_UPDATETENANT, input);
        return rs ? rs.data : rs;
    }

    public async GetPermissionBasic()
        : Promise<ResponsesResource<PermissionTenantTreeDto[]>> {
        let rs = await http.get(PermissionUri.SYSTEMTENANT_GETPERMISSIONMAXIMUM);
        return rs ? rs.data : rs;
    }

    public async LoadPermissionByIdTenant(id?: number)
        : Promise<ResponsesResource<string[]>> {
        let rs = await http.get('/api/services/app/Permission/LoadPermissionTenantId',
            {
                params: { id: id }
            });
        return rs ? rs.data : rs;
    }

    public async LoadPermissionByIdTenantAndRole(id?: number, idRole?: number)
        : Promise<ResponsesResource<string[]>> {
        let rs = await http.get('/api/services/app/Permission/LoadPermissionMaximumByRoleTenantID',
            {
                params: { id: id, idRole: idRole }
            });
        return rs ? rs.data : rs;
    }

    public async GetPermissionByIdTenantRole(id?: number)
        : Promise<ResponsesResource<PermissionTenantTreeDto[]>> {
        let rs = await http.get('/api/services/app/Permission/GetPermissionByTenant',
            {
                params: { idTenant: id }
            });
        return rs ? rs.data : rs;
    }

    public async UpdatePermissionByIdTenant(input: UpdatePermissionForTenantDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.put(PermissionUri.SYSTEMTENANT_UPDATEPERMISSIONFORTENANT,
            input);
        return rs ? rs.data : rs;
    }

    public async UpdatePermissionByIdTenantForRole(input: UpdatePermissionForTenantRoleDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.put('/api/services/app/Permission/UpdatePermissionForRoleTenant',
            input);
        return rs ? rs.data : rs;
    }

    public async GetAllRoleByTenantId(input: SearchRequest, idTenant: number)
        : Promise<ResponsesResource<PagedResultDto<RoleTenantReadDto>>> {
        let rs = await http.get(PermissionUri.ROLEINTERNAL_GETALLROLEBYTENANTID,
            {
                params: {
                    propertySearch: input.propertySearch,
                    valuesSearch: input.valuesSearch,
                    propertyOrder: input.propertyOrder,
                    valueOrderBy: input.valueOrderBy,
                    pageIndex: input.pageIndex,
                    pageSize: input.pageSize,
                    tenantId: idTenant
                }
            });
        return rs ? rs.data : rs;
    }

    public async CreateTeantRoleBasic(input: RoleTenantBasicDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post(PermissionUri.ROLESYSTEM_CREATETENANTBASIC, input);
        return rs ? rs.data : rs;
    }

    public async UpdateTeantRoleBasic(input: RoleTenantBasicDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post(PermissionUri.ROLESYSTEM_UPDATETENANTBASIC, input);
        return rs ? rs.data : rs;
    }

    public async LoadRoleForUser(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<RoleTenantDictionaryDto>>> {
        let rs = await http.get('/api/services/app/RoleTenant/LoadRoleSelectForUser',
            {
                params: {
                    valuesSearch: input.valuesSearch,
                    pageIndex: input.pageIndex,
                    pageSize: input.pageSize
                }
            });
        return rs ? rs.data : rs;
    }

    public async LoadPermissionReview(roleId: number, tenantId: number)
        : Promise<ResponsesResource<PermissionTenantTreeDto[]>> {
        let rs = await http.get('/api/services/app/Permission/LoadPermissionReview',
            {
                params: {
                    roleId: roleId,
                    tenantId: tenantId
                }
            });
        return rs ? rs.data : rs;
    }

    public async InsertUserTenant(input: UserTenantInsertUpdateDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post('/api/services/app/UserTenant/Create', input);
        return rs ? rs.data : rs;
    }

    public async UserTenantGetAll(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<UserTenantReviewDto>>> {
        let rs = await http.get('/api/services/app/UserTenant/GetAll',
            {
                params: {
                    valuesSearch: input.valuesSearch,
                    pageIndex: input.pageIndex,
                    pageSize: input.pageSize
                }
            });
        return rs ? rs.data : rs;
    }
}

export default new TenantAdminService();