import Entity from "../../../../services/dto/entity";
import { AdressUL } from "./atributeTypes";

export interface AdressInsertDto {
    name: string;
    types: AdressUL;
    categoryProductId: number;
    isActive: boolean;
}

export interface AdressUpdateDto extends Entity<number> {
    name: string;
    types: AdressUL;
    categoryProductId: number;
    isActive: boolean;
}