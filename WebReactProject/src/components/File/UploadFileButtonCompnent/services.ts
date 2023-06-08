import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import download from 'js-file-download';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { UploadFile } from 'antd';
import { notifyError } from '../../Common/notification';
import { RcFile } from 'antd/es/upload/interface';
import { FileUploadRep } from './dataTypes/response';

class UploadFileComponentService {
    public async upload<T>(uri: string, input: T)
        : Promise<ResponsesResource<UploadFile> | undefined> {
        const formData = new FormData();
        (Array.isArray(input) ? input : [input]).forEach((file) => {
            formData.append('file', file as RcFile);
        });
        const config = {
            "headers": {
                "content-type": 'multipart/form-data'
            }
        }
        try {
            var rs = await http.post(uri, formData, config);
            return rs ? rs.data : rs;
        } catch (error) {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return undefined;
        }
    }

    public async uploadStream(uri: string, file: Blob, id: string, numberOrder: number)
        : Promise<ResponsesResource<FileUploadRep>> {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);
        formData.append('numberOrder', numberOrder.toString());

        const config = {
            "headers": {
                "content-type": 'multipart/form-data'
            }
        }

        try {
            var rs = await http.post(uri, formData, config);
            return rs ? rs.data : rs;
        } catch (error) {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return {
                error: true,
                errorCode: "500",
                messageError: undefined,
                result: {
                    uid: id,
                    name: "dasdaa",
                    status: "done",
                    url: "/url",
                    numberOrder: numberOrder
                }
            };
        }
    }

    public async uploadomplated(uri: string, fileName: string): Promise<ResponsesResource<FileUploadRep>> {
        try {
            var rs = await http.get(uri, { params: { fileName: fileName } });
            return rs ? rs.data : rs;
        } catch (error) {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return {
                error: true,
                errorCode: "500",
                messageError: undefined,
                result: {
                    uid: "",
                    name: "",
                    status: "",
                    url: "",
                    numberOrder: 0
                }
            };
        }
    }

    public async removeFileBasic(file: string): Promise<ResponsesResource<string[]>> {
        try {
            var rs = await http.delete("/api/services/app/FileUpload/RemoveFileBasic",
                { params: { uriFile: file } });
            return rs ? rs.data : rs;
        } catch (error) {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return {
                error: true,
                errorCode: "500",
                messageError: undefined,
                result: []
            };
        }
    }
}

export default new UploadFileComponentService();