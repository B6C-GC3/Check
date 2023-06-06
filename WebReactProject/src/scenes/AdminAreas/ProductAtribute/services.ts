import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { ProductAttributeDto } from './dtos/productAttributeDto';

class ProductAttributeService {
    public async loadAttibute(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<ProductAttributeDto>>> {
        let rs = await http.get('/api/services/app/Attribute/GetPageList',
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

export default new ProductAttributeService();