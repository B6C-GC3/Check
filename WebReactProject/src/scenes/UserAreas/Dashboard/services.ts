import axios from 'axios';
import http from '../../../services/httpService';
import fileDownload from 'js-file-download'

class LoginService {

    public async checkToken(token: any) {
        const formData = new FormData();
        formData.append('aaaaaa[0].File', token);
        formData.append('aaaaaa[0].Url', "sssss");

        formData.append('aaaaaa[1].File', token);
        formData.append('aaaaaa[1].Url', "sssss2");

        try {
            const res = await axios.post("https://localhost:44363/v1/api/Home/UploadFile", formData);
        } catch {

        }

        // let rs = await http.post('/home/UploadFile', {
        //     file: token
        // });

        // if (rs) {
        //     return rs.data.result;
        // }
        // else {
        //     return rs;
        // }
    }

    public async dowLoadFile()
    {
        //let rs = await http.post('https://localhost:44363/album-resources/Employee_Report.pdf', {responseType: 'blob' });
        axios.get('https://localhost:44363/album-resources/Employee_Report.pdf', {
            responseType: 'blob',
          })
          .then((res) => {
            fileDownload(res.data,"fileServer.pdf")
          })
    }
}

export default new LoginService();