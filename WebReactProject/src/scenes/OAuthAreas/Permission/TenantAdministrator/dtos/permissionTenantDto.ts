export interface IPermissionTenantDto {

}

export interface RoleTenantReadDto extends RoleTenantBasicDto {
    name: string;
    tenantName: string;
    lastModificationTime: string;
    lastModifierUserId: number;
    lastModifierUserName: string;
}

export interface RoleTenantBasicDto {
    id: number;
    displayName: string;
    isDefault: boolean;
    isDeleted: boolean;
    isStatic: boolean;
    description: string;
    tenantId: number;
}