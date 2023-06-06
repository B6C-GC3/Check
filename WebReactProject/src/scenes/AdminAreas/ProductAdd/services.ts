import { SelectedModel } from '../../../services/common/selectedModel';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { ProductAttributeValueAddBySuppllier, SupplierCategorAddProductDto, SupplierCtreateAttributeByAddProoduct } from './dtos/productAddDto';
import { ProductAddInsertsDto } from './dtos/productAddQuery';

class AddProductService {

    public async productAddbySuppplier(input: ProductAddInsertsDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post('/api/services/app/ProductAddSupplier/InsertProduct', input);
        return rs ? rs.data : rs;
    }

    public async getAttributeSpecifications(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<SelectedModel>>> {
        let rs = await http.get('/api/services/app/SupplierAttributeSpecifications/GetAttributeSpecifications',
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

    public async loadValueByIdAttribute(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<SelectedModel>>> {
        let rs = await http.get('/api/services/app/ProductAttributeValue/GetAllAttributeValue',
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

    public async loadTrademarkByCategory(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<SelectedModel>>> {
        let rs = await http.get('/api/services/app/ProductAttributeValue/GetTrademarkByCategorys',
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

    public async loadUnitByCategory(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<SelectedModel>>> {
        let rs = await http.get('/api/services/app/ProductAttributeValue/GetUnitByCategorys',
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

    public async createUnitOrTrademarkCategory(input: SupplierCtreateAttributeByAddProoduct)
        : Promise<ResponsesResource<PagedResultDto<SelectedModel>>> {
        let rs = await http.post('/api/services/app/SupplierAttributeValue/CreteAttributeWhenAddProduct', input);
        return rs ? rs.data : rs;
    }

    public async createAttributeProductBySupplier(input: ProductAttributeValueAddBySuppllier)
        : Promise<ResponsesResource<PagedResultDto<SelectedModel>>> {
        let rs = await http.post('/api/services/app/ProductAttributeValue/InsertProductAttributeValueBySupplier', input);
        return rs ? rs.data : rs;
    }

    public async getAttribute(input: number[])
        : Promise<ResponsesResource<SelectedModel[]>> {
        let rs = await http.get('/api/services/app/ProductAttributeValue/GetAllAttribute',
            {
                params: {
                    IdCategorys: input
                }
            });
        return rs ? rs.data : rs;
    }
}

export default new AddProductService();