import { PagedResultDto } from '../../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../../services/dto/responsesResource';
import { SearchRequest } from '../../../../services/dto/searchRequest ';
import http from '../../../../services/httpService';
import { PermissionUri } from '../../../../services/urlApi/permisionUri';
import { UpdatePermissionForTenantDto } from './dtos/permissionDto';
import { PermissionInternalTreeDto, RoleInternalBasicDto, RoleInternalReadDto } from './dtos/roleInternalReadDto';

class RoleInternalService {
    public async GetAllRoleByMyTenant(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<RoleInternalReadDto>>> {
        let rs = await http.get(PermissionUri.ROLEINTERNAL_GETALLROLE,
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

    public async InsertRoleBasic(input: RoleInternalBasicDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post(PermissionUri.ROLEINTERNAL_CREATEROLE, input);
        return rs ? rs.data : rs;
    }

    public async UpdateRoleBasic(input: RoleInternalBasicDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post(PermissionUri.ROLEINTERNAL_UPDATEROLE, input);
        return rs ? rs.data : rs;
    }


    public async GetPermissionBasic()
        : Promise<ResponsesResource<PermissionInternalTreeDto[]>> {
        let rs = await http.get(PermissionUri.SYSTEMTENANT_GETPERMISSIONMAXIMUM);
        return rs ? rs.data : rs;
    }

    public async LoadPermissionByIdTenant(id?: number)
        : Promise<ResponsesResource<string[]>> {
        let rs = await http.get(PermissionUri.SYSTEMTENANT_GETPERMISSIONMAXIMUMBYID,
            {
                params: { id: id }
            });
        return rs ? rs.data : rs;
    }

    public async UpdatePermissionByIdTenant(input: UpdatePermissionForTenantDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.put(PermissionUri.SYSTEMTENANT_UPDATEPERMISSIONFORTENANT,
            input);
        return rs ? rs.data : rs;
    }
}

export default new RoleInternalService();