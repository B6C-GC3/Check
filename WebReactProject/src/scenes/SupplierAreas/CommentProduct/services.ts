import { PagedResultDto } from "../../../services/dto/pagedResultDto";
import { ResponsesResource } from "../../../services/dto/responsesResource";
import { SearchRequest } from "../../../services/dto/searchRequest ";
import http from "../../../services/httpService";
import { AssessmentSupplierCommentDto, AssessmentSupplierOverviewDto } from "./dtos/assessmentSupplierOverviewDto";

class Service {

    public async WatchedComment(ids: React.Key[]): Promise<ResponsesResource<number>> {
        let rs = await http.patch('/api/services/app/AssessmentSupplier/WatchedComment',ids);
        return rs ? rs.data : rs;
    }

    public async GetOverrview(input: number): Promise<ResponsesResource<AssessmentSupplierOverviewDto>> {
        let rs = await http.get('/api/services/app/AssessmentSupplier/GetOverrview',
            {
                params: { productId: input }
            });

        return rs ? rs.data : rs;
    }

    public async GetCommentProduct(input: SearchRequest): Promise<ResponsesResource<PagedResultDto<AssessmentSupplierCommentDto>>> {
        let rs = await http.get('/api/services/app/AssessmentSupplier/GetCommentProduct',
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

export default new Service();