import Entity from "../../../../services/dto/entity";
import { AttributeUL } from "./atributeTypes";
import { DataTypeProductAdd, DataTypeProductDto, ProductQueryDto } from "./productAddDto";

export interface ProductAddInsertsDto {
    categorys: number[];
    infoBasic: ProductQueryDto;
    images: string[];
    futureProduct: DataTypeProductDto[];
    techProduct: string;
    gift: any;
    postProduct: string;
    seo: any;
}

export interface ProductAddUpdateDto extends Entity<number> {
    name: string;
    types: AttributeUL;
    categoryProductId: number;
    isActive: boolean;
}