import { notifyError } from "./components/Common/notification";
import { ResponsesResource } from "./services/dto/responsesResource";
import http from "./services/httpService";

class FirstMoverService {
    public async DefaultLoader(): Promise<ResponsesResource<LocationDetectionDto>> {
        let rs = await http.get('/api/services/app/Me/LocationDetection');
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }

    public async setCookie()
        : Promise<ResponsesResource<void> | undefined> {
        try {
            let rs = await http.get('/AntiForgery/SetCookie');
            return rs ? rs.data : rs;
        } catch {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return undefined;
        }
    }
}

export default new FirstMoverService();

export interface LocationDetectionDto {
    location: string;
}