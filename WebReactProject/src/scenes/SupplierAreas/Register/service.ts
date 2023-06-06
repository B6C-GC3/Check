import { defaultTo } from "lodash";
import { notifyError } from "../../../components/Common/notification";
import { ResponsesResource } from "../../../services/dto/responsesResource";
import http from "../../../services/httpService";
import { LanguageSystemDto } from "./dataTypes/language";
import { SupplierRegisterDto } from "./dataTypes/supplier";

class RegisterService {
    public async getAllLaguage()
        : Promise<ResponsesResource<LanguageSystemDto[] | undefined>> {
        try {
            let rs = await http.get('/api/services/app/Language/GetAllLaguage');
            return rs ? rs.data : rs;
        } catch {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return {
                error: false,
                errorCode: "",
                messageError: undefined,
                result: undefined
            };
        }
    }

    public async getInfoSupplier()
        : Promise<ResponsesResource<SupplierRegisterDto | undefined>> {
        try {
            let rs = await http.get('/api/services/app/RegisterSupplierAccount/GetInfoSupplier');
            return rs ? rs.data : rs;
        } catch {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return {
                error: false,
                errorCode: "",
                messageError: undefined,
                result: undefined
            };
        }
    }

    public async registerOrUpdateSupplierService(input: SupplierRegisterDto)
        : Promise<ResponsesResource<number>> {
        try {
            let rs = await http.post('/api/services/app/RegisterSupplierAccount/RegisterOrUpdateSupplierService',input);
            return rs ? rs.data : rs;
        } catch {
            notifyError("Cảnh báo lỗi!", "Đã sảy ra lỗi trong yêu cầu của bạn!");
            return {
                error: false,
                errorCode: "",
                messageError: undefined,
                result: 0
            };
        }
    }
}

export default new RegisterService();