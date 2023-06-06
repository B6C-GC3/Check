import { ResponsesResource } from "../../../services/dto/responsesResource";
import http from "../../../services/httpService";
import { DetailInfoBasicProductDto } from "./dtos/cartBasicProductDto";
import { FeatureProductContainerDto, FeatureProductReadDto } from "./dtos/featureProductContainerDto";
import { ImageForProductDto, ImageProductContainerDto } from "./dtos/imageForProductDto";

class HDetailService {
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
}

export default new HDetailService();
