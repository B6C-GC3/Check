import { IdentityKey } from '../../../services/dto/commonDto';
import { PagedResultDto } from '../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../services/dto/responsesResource';
import { SearchRequest } from '../../../services/dto/searchRequest ';
import http from '../../../services/httpService';
import { AdminCategoryCreateDto, CategoryChangeNumberOrder, CategoryMainDto, CategoryTableDto, TenantCommonDto, TenantCommonIdDto } from './dataTypes/categoryDtos';

class CategoryService {

    public async lockCategory(input: IdentityKey<number>)
        : Promise<ResponsesResource<TenantCommonIdDto>> {
        let rs = await http.put('/api/services/app/CategoryProduct/LockCategory', input);
        return rs ? rs.data : rs;
    }

    public async changePlacesCategory(input: CategoryChangeNumberOrder)
        : Promise<ResponsesResource<TenantCommonIdDto>> {
        let rs = await http.post('/api/services/app/CategoryProduct/ChangePlacesCategory', input);
        return rs ? rs.data : rs;
    }

    public async loadTenant(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<TenantCommonIdDto>>> {
        let rs = await http.get('/api/v1/TenantSupport/GetAllId',
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

    public async insertCategory(input: AdminCategoryCreateDto)
        : Promise<ResponsesResource<number>> {
        console.log('input', input)
        try {
            let rs = await http.post('/api/services/app/CategoryProduct/CreateCategoryForAdmin', input);
            if (rs) {
                return rs.data;
            }
            else {
                return rs;
            }
        } catch (error) {
            return {
                error: true,
                errorCode: "500",
                messageError: "",
                result: 0
            };
        }
    }

    public async getCategoryMain(level: number, name: string)
        : Promise<ResponsesResource<CategoryMainDto[]>> {
        try {
            let rs = await http.get('/api/services/app/CategoryProduct/GetCategoryMain', { params: { level: level, nameSearch: name } });
            if (rs) {
                return rs.data;
            }
            else {
                return rs;
            }
        } catch (error) {
            return {
                error: true,
                errorCode: "500",
                messageError: "",
                result: []
            };
        }
    }

    public async getdataTable(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<CategoryTableDto> | undefined>> {
        try {
            let rs = await http.get('/api/services/app/CategoryProduct/GetData', { params: input });
            if (rs) {
                return rs.data;
            }
            else {
                return rs;
            }
        } catch (error) {
            return {
                error: true,
                errorCode: "500",
                messageError: "",
                result: undefined
            };
        }
    }
}

export default new CategoryService();