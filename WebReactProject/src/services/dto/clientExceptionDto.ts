import { notifyError } from "../../components/Common/notification";
import { L } from "../../lib/abpUtility";

export interface ClientExceptionDto {
    field: string;
    content: string[];
}

export interface ClientExceptionDtoMessager {
    field: string;
    content: string;
}

/**
 * Thông báo lỗi với Localization là common
 * @param input Error messager từ server trả về.
 * @return Thông báo lỗi.
 **/
export function ToClientExceptionNotifyErrorCommon(input: any) {
    if (!input) notifyError(L("ERROR", "COMMON"), L("DEFAULT_MESSAGER_ERROR", "COMMON"));
    var dataMess = "";
    Object.keys(input).map((key) => {
        dataMess = dataMess + L(key.trim(), "COMMON") + " : " + input[key.trim()].map((k: string) => L(k.trim(), "COMMON")) + " , ";
    });
    notifyError(L("ERROR", "COMMON"), dataMess);
}

/**
 * Thông báo lỗi với Localization là common
 * @param input Error messager từ server trả về.
 * @param
 * @return Thông báo lỗi.
 **/
export function ToClientExceptionNotifyError(input: any, keyLocalization: string) {
    if (!input) notifyError(L("ERROR", "COMMON"), L("DEFAULT_MESSAGER_ERROR", "COMMON"));
    var dataMess = "";
    try {
        dataMess = "";
        var dataConvert: ClientExceptionDtoMessager = JSON.parse(input);
        dataMess = dataMess + L(dataConvert.field.trim(), keyLocalization) + " : " + L(dataConvert.content.trim(), keyLocalization);
    }
    catch {
        dataMess = "";
        Object.keys(input).map((key) => {
            dataMess = dataMess + L(key.trim(), keyLocalization) + " : " + input[key.trim()].map((k: string) => L(k.trim(), keyLocalization)) + " , ";
        });
    }
    notifyError(L("ERROR", "COMMON"), dataMess);
}

/**
 * Thông báo lỗi với Localization là common
 * @param input Error messager từ server trả về.
 * @param keyLocalization key localization chính 
 * @param keyCommonLocalization key localization phụ thay thế cho common
 * @return Thông báo lỗi.
 **/
export function ToClientExceptionNotifyErrorKey(input: any, keyLocalization: string, keyCommonLocalization: string) {
    if (!input) notifyError(L("ERROR", keyCommonLocalization), L("DEFAULT_MESSAGER_ERROR", keyCommonLocalization));
    var dataMess = "";
    Object.keys(input).map((key) => {
        dataMess = dataMess + L(key.trim(), keyLocalization) + " : " + input[key.trim()].map((k: string) => L(k.trim(), keyLocalization)) + " , ";
    });
    notifyError(L("ERROR", keyCommonLocalization), dataMess);
}

/**
 * Thông báo lỗi với Localization là common
 * @param input Error messager từ server trả về.
 * @param
 * @return Thông báo lỗi.
 **/
export function ToClientException(input: any): ClientExceptionDto[] {
    if (!input) notifyError(L("ERROR", "COMMON"), L("DEFAULT_MESSAGER_ERROR", "COMMON"));
    var result: ClientExceptionDto[] = Object.keys(input).map((key) => {
        return {
            field: key,
            content: input[key]
        } as ClientExceptionDto
    });
    return result;
}