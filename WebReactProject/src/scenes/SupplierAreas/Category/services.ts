import { SelectedModel } from '../../../services/common/selectedModel';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { CategoryTableDto } from './dataTypes/categoryDtos';

class CategoryService {
    public async getCategoryRoot(input: SearchRequest): Promise<ResponsesResource<PagedResultDto<SelectedModel>>> {
        let rs = await http.get('/api/services/app/CategoryRoot/GetCategoryRoot', {
            params: {
                propertySearch: input.propertySearch,
                valuesSearch: input.valuesSearch,
                propertyOrder: input.propertyOrder,
                valueOrderBy: input.valueOrderBy,
                pageIndex: input.pageIndex,
                pageSize: input.pageSize
            }
        });
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }

    public async insertOrUpdateCategory(ids: number[]): Promise<ResponsesResource<number>> {
        let rs = await http.post('/api/services/app/CategorySupplier/InsertOrUpdateCategory',ids);
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }
}

export default new CategoryService();