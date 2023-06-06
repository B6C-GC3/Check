export interface TenantRep {
    tenancyName: string;
}

export interface TenantCommonDto {
    name: string;
    tenancyName: string;
}

export interface TenantResultCheck {
    state: number;
    tenantId: number;
}