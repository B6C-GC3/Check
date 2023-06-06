import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { SupplierInfoDto } from './dataTypes/supplierInfoDto';

class SupplierInfoService {
    public async getPagelist(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<SupplierInfoDto>>> {
        let rs = await http.get('/api/services/app/InfoSupplier/GetPagelist',
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
}

export default new SupplierInfoService();