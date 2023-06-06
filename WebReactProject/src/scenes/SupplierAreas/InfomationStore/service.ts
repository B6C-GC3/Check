import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { SupplierInfoDto } from './dataTypes/supplierInfoDto';

class InfomationStoreService {
    public async getSingleSupplier()
        : Promise<ResponsesResource<SupplierInfoDto>> {
        let rs = await http.get('/api/services/app/InfoSupplier/GetSingleSupplier');
        return rs ? rs.data : rs;
    }
}

export default new InfomationStoreService();