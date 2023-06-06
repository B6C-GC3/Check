import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { CategoryTableDto } from './dataTypes/categoryDtos';
import { CategoryTableFake } from './dataTypes/dataFake';

class CategoryService {
    public async getdataTable(input: SearchRequest): Promise<CategoryTableDto[]> {
        // let rs = await http.post('/auth/checkToken', {
        //     Token: token
        // });
        // if (rs) {
        //     return rs.data.result;
        // }
        // else {
        //     return rs;
        // }
        return CategoryTableFake;
    }
}

export default new CategoryService();