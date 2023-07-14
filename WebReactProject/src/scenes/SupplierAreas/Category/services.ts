import React from 'react';
import { SelectedModel } from '../../../services/common/selectedModel';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { CategorySupplierMappingDto, CategorySupplierMappingSimpDto, CategoryTableDto, ChangeNumberOrder } from './dtos/categoryDtos';

class CategoryService {
    public async ChangeIsActived(id: React.Key)
        : Promise<ResponsesResource<CategorySupplierMappingSimpDto>> {
        let rs = await http.patch('/api/services/app/CategorySupplier/ChangeIsActived', { id: id });
        return rs ? rs.data : rs;
    }

    public async ShowOnHomePageHandle(id: React.Key)
        : Promise<ResponsesResource<CategorySupplierMappingSimpDto>> {
        let rs = await http.patch('/api/services/app/CategorySupplier/ShowOnHomePageHandle', { id: id });
        return rs ? rs.data : rs;
    }

    public async ChangeOrderNumber(input: ChangeNumberOrder)
        : Promise<ResponsesResource<number>> {
        let rs = await http.patch('/api/services/app/CategorySupplier/ChangeOrderNumber', input);
        return rs ? rs.data : rs;
    }

    public async GetDataPagedList(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<CategorySupplierMappingDto>>> {
        let rs = await http.get('/api/services/app/CategorySupplier/GetDataPagedList', {
            params: {
                propertySearch: input.propertySearch,
                valuesSearch: input.valuesSearch,
                propertyOrder: input.propertyOrder,
                valueOrderBy: input.valueOrderBy,
                pageIndex: input.pageIndex,
                pageSize: input.pageSize
            }
        });
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }

    public async getCategoryRoot(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<SelectedModel>>> {
        let rs = await http.get('/api/services/app/CategoryRoot/GetCategoryRoot', {
            params: {
                propertySearch: input.propertySearch,
                valuesSearch: input.valuesSearch,
                propertyOrder: input.propertyOrder,
                valueOrderBy: input.valueOrderBy,
                pageIndex: input.pageIndex,
                pageSize: input.pageSize
            }
        });
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }

    public async insertOrUpdateCategory(ids: number[])
        : Promise<ResponsesResource<number>> {
        let rs = await http.post('/api/services/app/CategorySupplier/InsertOrUpdateCategory', ids);
        if (rs) {
            return rs.data;
        }
        else {
            return rs;
        }
    }

}

export default new CategoryService();