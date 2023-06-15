import { PagedResultDto } from "../../../services/dto/pagedResultDto";
import { ResponsesResource } from "../../../services/dto/responsesResource";
import { SearchRequest } from "../../../services/dto/searchRequest ";
import http from "../../../services/httpService";
import { AssessmentProductComment, AssessmentProductReq, AssessmentProductRes, AssessmentProductStat, LikeCommentAssessmentProduct, LoadRepCommnetAssessmentProduct, ReplyCommentAssessmentProduct } from "./dtos/assessmentProduct";
import { DetailInfoBasicProductDto } from "./dtos/cartBasicProductDto";
import { FeatureProductContainerDto, FeatureProductReadDto } from "./dtos/featureProductContainerDto";
import { ImageProductContainerDto } from "./dtos/imageForProductDto";

class HDetailService {

  public async LoadCommentAssessmentProduct(input: SearchRequest)
    : Promise<ResponsesResource<PagedResultDto<LoadRepCommnetAssessmentProduct>>> {
    let rs = await http.get("/api/services/app/AssessmentProduct/LoadCommentAssessmentProduct",
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
    if (rs) {
      return rs.data;
    } else {
      return rs;
    }
  }

  public async CommentAssessmentProduct(input: ReplyCommentAssessmentProduct)
    : Promise<ResponsesResource<number>> {
    let rs = await http.post("/api/services/app/AssessmentProduct/CommentAssessmentProduct", input);
    if (rs) {
      return rs.data;
    } else {
      return rs;
    }
  }

  public async ChangeLikeOrDislikeAssessment(input: LikeCommentAssessmentProduct)
    : Promise<ResponsesResource<number>> {
    let rs = await http.post("/api/services/app/AssessmentProduct/ChangeLikeOrDislikeAssessment", input);
    if (rs) {
      return rs.data;
    } else {
      return rs;
    }
  }

  public async getAssessmentProductCommnet(input: SearchRequest)
    : Promise<ResponsesResource<PagedResultDto<AssessmentProductComment>>> {
    let rs = await http.get("/api/services/app/AssessmentProduct/GetAssessmentProductCommnet",
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
    if (rs) {
      return rs.data;
    } else {
      return rs;
    }
  }

  public async getStarProduct(idsp: number): Promise<ResponsesResource<AssessmentProductStat>> {
    let rs = await http.get('/api/services/app/AssessmentProduct/GetStarProduct', { params: { idsp: idsp } });
    if (rs) {
      return rs.data;
    }
    else {
      return rs;
    }
  }

  public async getFeatureCartProductService(input: number): Promise<FeatureProductContainerDto[]> {
    let rs = await http.get('/cart-feature-product', { params: { input: input } });
    if (rs) {
      return rs.data;
    }
    else {
      return rs;
    }
  }

  public async getImageProductService(input: number): Promise<ResponsesResource<ImageProductContainerDto[]>> {
    let rs = await http.get('/api/services/app/DetailProduct/GetImageProduct', { params: { idsp: input } });
    if (rs) {
      return rs.data;
    }
    else {
      return rs;
    }
  }

  public async getBasicProductCartService(input: number): Promise<ResponsesResource<DetailInfoBasicProductDto>> {
    let rs = await http.get('/api/services/app/DetailProduct/GetDefaultProduct', { params: { idsp: input } });
    if (rs) {
      return rs.data;
    }
    else {
      return rs;
    }
  }

  public async featureProductReadDto(input: number): Promise<ResponsesResource<FeatureProductReadDto[]>> {
    let rs = await http.get("/api/services/app/DetailProduct/GetFeatureDefault", {
      params: { idsp: input },
    });
    if (rs) {
      return rs.data;
    } else {
      return rs;
    }
  }

  public async assessmentProductReq(input: AssessmentProductReq)
    : Promise<ResponsesResource<number>> {
    let rs = await http.post("/api/services/app/AssessmentProduct/Create", input);
    if (rs) {
      return rs.data;
    } else {
      return rs;
    }
  }
}

export default new HDetailService();
