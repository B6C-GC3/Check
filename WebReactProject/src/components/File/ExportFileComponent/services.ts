import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import download from 'js-file-download';

class DownloadFileComponentService {
    public async dowloadFile<T>(uri: string, input: T, fileName: string): Promise<any[]> {
        http.get(uri, { params: { input } })
            .then(resp => { download(resp.data, fileName); });
        return [];
    }
}

export default new DownloadFileComponentService();