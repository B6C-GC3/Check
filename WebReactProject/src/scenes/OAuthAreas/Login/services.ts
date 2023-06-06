import { AuthenticationInput } from './dtos/authenticationInput';
import { AuthenticationResult } from './dtos/authenticationResult';
import { CheckTokenResult } from './dtos/checkTokenResult';
import http from '../../../services/httpService';
import { TenantCommonDto, TenantRep, TenantResultCheck } from './dtos/tenantRep';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { notifyError } from '../../../components/Common/notification';

class LoginService {
    public async loadTenant(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<TenantCommonDto>>> {
        let rs = await http.get('/api/v1/TenantSupport/GetAll',
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

    public async isTenantAvailable(input: TenantRep)
        : Promise<ResponsesResource<TenantResultCheck> | undefined> {
        try {
            let rs = await http.post('/api/services/app/Account/IsTenantAvailable', input);
            return rs ? rs.data : rs;
        } catch {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return undefined;
        }
    }

    public async loggin(input: AuthenticationInput, tenant: number)
        : Promise<ResponsesResource<AuthenticationResult> | undefined> {
        try {
            let rs = await http.post('/api/TokenAuth/Authenticate', input, {
                headers: { 'abp.tenantid': tenant },
            });
            return rs ? rs.data : rs;
        } catch {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return undefined;
        }
    }

    public async authenticate(input: AuthenticationInput | undefined)
        : Promise<AuthenticationResult> {
        let rs = await http.get('/api/services/app/User/GetAll');
        return rs ? rs.data.result : rs;
    }

    public async checkToken(token: string)
        : Promise<CheckTokenResult> {
        let rs = await http.post('/auth/checkToken', {
            Token: token
        });
        return rs ? rs.data.result : rs;
    }
}

export default new LoginService();