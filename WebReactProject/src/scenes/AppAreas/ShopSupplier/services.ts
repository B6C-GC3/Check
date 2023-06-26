
import http from "../../../services/httpService";

class ShopSupplierService {
    // public async GetProduct(input: SearchRequest): Promise<ResponsesResource<PagedResultDto<ProductSupplierDto>>> {
    //     let rs = await http.get('/api/services/app/ProductSupplier/GetProduct',
    //         {
    //             params: {
    //                 propertySearch: input.propertySearch,
    //                 valuesSearch: input.valuesSearch,
    //                 propertyOrder: input.propertyOrder,
    //                 valueOrderBy: input.valueOrderBy,
    //                 pageIndex: input.pageIndex,
    //                 pageSize: input.pageSize
    //             }
    //         });
            
    //     return rs ? rs.data : rs;
    // }
}
export default new ShopSupplierService();