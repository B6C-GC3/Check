import http from "../../../services/httpService";

class HomePageService {
    public async productAddbySuppplier(input: any)
        : Promise<number> {
        let rs = await http.post('/api/services/app/ProductAddSupplier/InsertProduct', input);
        return rs ? rs.data : rs;
    }
}
