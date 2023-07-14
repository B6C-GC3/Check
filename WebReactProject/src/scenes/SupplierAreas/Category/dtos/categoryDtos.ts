export interface CategoryTableDto {
    id: number;
    name: string;
    level: string;
    idParent: number;
    nameParent: string;
}

export interface CategoryInOrUpDto {
    id: number;
    name: string;
    level: string;
    idParent: number;
    nameParent: string;
}

export interface CategoryInterview {
    id: number;
    level: number;
}

export interface CategorySelectedProps {
    level: number;
    ids: number[];
}

export interface CategorySupplierMappingDto {
    id: number;
    name: string;
    categoryMain: number;
    categoryMainName: string;
    orderNumber: number;
    showHomePage: boolean;
    isActived: boolean;
    userEdit: number;
    userName: string;
}

export interface ChangeNumberOrder {
    idOld: number;
    idNew: number;
}

export interface CategorySupplierMappingSimpDto {
    orderNumber: number;
    showHomePage: boolean;
}