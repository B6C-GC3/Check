import http from '../../../services/httpService';
import { DataTreeDto } from './dtos/dataTreeDto';

class MenuSliderService {
    public async checkToken(token: string): Promise<DataTreeDto[]> {
        let rs = await http.post('/auth/checkToken', {
            Token: token
        });
        if (rs) {
            return rs.data.result;
        }
        else {
            return rs;
        }
    }
}
  
export default new MenuSliderService();