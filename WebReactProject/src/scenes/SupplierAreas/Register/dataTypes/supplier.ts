import Entity from "../../../../services/dto/entity";

export interface SupplierRegisterDto extends Entity<number> {
    numberPhone: string;
    email: string;
    passWordShop: string;
    nameShop: string;
    linkShop: string;
    adress: string;
    url: string;
    companyVat: string;
    defaultLanguageId: number;
    status: number;
    hierarchical: number;
}