export interface ResponsesResource<T> {
    error: boolean;
    errorCode: string;
    messageError: any;
    result: T;
}