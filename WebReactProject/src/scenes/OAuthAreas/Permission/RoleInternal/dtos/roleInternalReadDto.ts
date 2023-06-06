export interface RoleInternalReadDto extends RoleInternalBasicDto {
    name: string;
    tenantId: number;
    tenantName: string;
    lastModificationTime: string;
    lastModifierUserId: number;
    lastModifierUserName: string;
}

export interface RoleInternalBasicDto {
    id: number;
    displayName: string;
    isDefault: boolean;
    isDeleted: boolean;
    isStatic: boolean;
    description: string;
}

export interface PermissionInternalTreeDto {
    key: string;
    children: PermissionInternalTreeDto[];
}