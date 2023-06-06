export interface PermissionInternalTreeDto {
    key: string;
    children: PermissionInternalTreeDto[];
}

export interface UpdatePermissionForTenantDto {
    id: number;
    permissins: string[];
}