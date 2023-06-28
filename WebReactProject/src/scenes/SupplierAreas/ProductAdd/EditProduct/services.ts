
import { ResponsesResource } from "../../../../services/dto/responsesResource";
import http from "../../../../services/httpService";
import { ProductAddInsertsDto } from "../dtos/productAddQuery";

class EditProductService {
    public async GetProduct(input: number): Promise<ResponsesResource<ProductAddInsertsDto>> {
        let rs = await http.get('/api/services/app/ProductUpdate/GetProductById',
            {
                params: { idsp: input }
            });

        return rs ? rs.data : rs;
    }
}

export default new EditProductService();