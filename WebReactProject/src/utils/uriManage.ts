export default class UriManage{
    public static onCheckParameter(uri: string, defaultUri: string): string[] {
        // sử lý chuỗi
        if (uri.lastIndexOf(defaultUri) === -1) return [];
        var paramGet = uri.substring(uri.lastIndexOf(defaultUri) + defaultUri.length).split('/');
        return paramGet.splice(1, paramGet.length - 1);
    }
}