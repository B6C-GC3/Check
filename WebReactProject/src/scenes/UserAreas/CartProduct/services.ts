import { ResponsesResource } from '../../../services/dto/responsesResource';
import http from '../../../services/httpService';
import { ReadCartProductResDto } from './dtos/ReadCartProductResDto';

class CartProductService {
    public async readCartForUser(): Promise<ResponsesResource<ReadCartProductResDto[]>> {
        let rs = await http.get('/api/services/app/CartProduct/ReadCartForUser');
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }
}
  
export default new CartProductService();