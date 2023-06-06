
export interface CategoryChangeNumberOrder {
    idRoot: number;
    idDestination: number;
}

export interface TenantCommonDto {
    name: string;
    tenancyName: string;
}

export interface TenantCommonIdDto {
    id: number;
    name: string;
    tenancyName: string;
}
export interface CategoryMainDto {
    id: number;
    name: string;
}

export interface CategoryTableDto {
    id: number;
    name: string;
    url: string;
    icon: string;
    level: number;
    categoryMainId: number;
    categoryMainName: string;
    numberOrder: number;
    tenantId: number;
    tenantName: string;
    isActive: boolean;
}

export interface CategoryInOrUpDto {
    id: number;
    name: string;
    level: string;
    idParent: number;
    nameParent: string;
}

export interface AdminCategoryCreateDto {
    id: number;
    name: string;
    url: string;
    icon: string | undefined;
    level: number;
    categoryMain: number;
    tenantId: number;
    isActive: boolean;
}
