import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { SupplierCategorAddProductDto } from '../ProductAdd/dtos/productAddDto';
import { ProductAttributeValueSupplier } from './dtos/productAttributeDto';
import { ProductAttributeInsertDto, ProductAttributeUpdateDto, ProductAttributeUpdateOutDto } from './dtos/productAttributeQuery';

class ProductAttributeService {

    public async deleteAttribute(input: string[])
        : Promise<ResponsesResource<number>> {
        let rs = await http.delete('/api/services/app/SupplierAttributeValue/DeleteValue', { params: { ids: input } });
        return rs ? rs.data : rs;
    }

    public async createAttribute(input: ProductAttributeUpdateOutDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post('/api/services/app/SupplierAttributeValue/Insert', input);
        return rs ? rs.data : rs;
    }

    public async loadCategoryBySupplier(input: SearchRequest)
        : Promise<ResponsesResource<SupplierCategorAddProductDto[]>> {
        let rs = await http.get('/api/services/app/SupplierCategory/LoadCategoryForAddProduct',
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

    public async loadAttibute(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<ProductAttributeValueSupplier>>> {
        let rs = await http.get('/api/services/app/SupplierAttributeValue/LoadAttributeSupplier',
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

export default new ProductAttributeService();