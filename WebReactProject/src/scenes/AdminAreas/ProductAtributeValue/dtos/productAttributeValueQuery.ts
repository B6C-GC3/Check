import Entity from "../../../../services/dto/entity";
import { ProductAttributeUL } from "./atributeTypes";

export interface ProductAttributeInsertDto {
    name: string;
    types: ProductAttributeUL;
    categoryProductId: number;
    isActive: boolean;
}

export interface ProductAttributeUpdateDto extends Entity<number> {
    name: string;
    types: ProductAttributeUL;
    categoryProductId: number;
    isActive: boolean;
}