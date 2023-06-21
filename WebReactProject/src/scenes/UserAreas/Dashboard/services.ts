import http from '../../../services/httpService';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { LanguageSystemDto } from './dtos/languageSystem';
import { UserInfoDto, UserInfoResDto } from './dtos/userInfoDto';

class LoginService {
    public async GetAllLaguage(): Promise<ResponsesResource<LanguageSystemDto[]>> {
        let rs = await http.get('/api/services/app/Language/GetAllLaguage');
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }

    public async GetUserInfo(): Promise<ResponsesResource<UserInfoResDto>> {
        let rs = await http.get('/api/services/app/InfoUser/Get');
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }

    public async SetInfoUser(input: UserInfoDto): Promise<ResponsesResource<number>> {
        let rs = await http.post('/api/services/app/InfoUser/Set', input);
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }
}

export default new LoginService();