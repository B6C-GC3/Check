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
    types: string[];
    key:string;
    categoryProductId: number[];
}

export interface ProductAttributeUpdateOutDto extends Entity<number> {
    name: string;
    types: number;
    key:string;
    categoryProductId: number[];
}

export interface SupplierCategorProductDto extends Entity<number> {
    name: string;
}