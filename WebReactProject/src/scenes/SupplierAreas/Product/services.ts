import { PagedResultDto } from "../../../services/dto/pagedResultDto";
import { ResponsesResource } from "../../../services/dto/responsesResource";
import { SearchRequest } from "../../../services/dto/searchRequest ";
import http from "../../../services/httpService";
import { ProductSupplierDto } from "./dtos/productSupplierDto";

class ProductService {
    public async GetProduct(input: SearchRequest): Promise<ResponsesResource<PagedResultDto<ProductSupplierDto>>> {
        let rs = await http.get('/api/services/app/ProductSupplier/GetProduct',
            {
                params: {
                    propertySearch: input.propertySearch,
                    valuesSearch: input.valuesSearch,
                    propertyOrder: input.propertyOrder,
                    valueOrderBy: input.valueOrderBy,
                    pageIndex: input.pageIndex,
                    pageSize: input.pageSize
                }
            });
            
        return rs ? rs.data : rs;
    }
}
export default new ProductService();