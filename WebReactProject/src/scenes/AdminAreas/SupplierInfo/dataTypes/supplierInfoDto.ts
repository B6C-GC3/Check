import Entity from "../../../../services/dto/entity";

export interface SupplierInfoDto extends Entity<number> {
    numberPhone: string;
    email: string;
    nameShop: string;
    linkShop: string;
    adress: string;
    url: string;
    defaultLanguageId: number;
    displayOrder: number;
    status: number;
    isActive: boolean;
    isDeleted: boolean;
}