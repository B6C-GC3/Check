import { Key } from "react";


export interface TenantUpdateDto extends TenantInsertDto {
    id: number;
}


export interface TenantDto {
    id: number;
    tenancyName: string;
    name: string;
    isActive: boolean;
}
export interface TenantInsertDto {
    name: string;
    isDeleted: boolean;
    isActive: boolean;
}

export interface TenantBasicDto {
    id: number;
    tenancyName: string;
    name: string;
    connectionString: string;
    isDeleted: boolean;
    isActive: boolean;
    lastModifierUserId: number;
    lastModifierUserName: string;
    lastModificationTime: string;
}

export interface TenantFullDto extends TenantBasicDto {
    editionId: number;
    deletionTime: string;
    deleterUserId: number;
    creatorUserId: number;
    creationTime: string;
}

export interface PermissionTenantTreeDto {
    key: string;
    children: PermissionTenantTreeDto[];
}

export interface UpdatePermissionForTenantDto {
    id: number;
    permissins: string[];
}

export interface UpdatePermissionForTenantRoleDto {
    id: number;
    roleId: number;
    permissins: string[];
}