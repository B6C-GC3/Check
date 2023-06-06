export interface IUserTenantDto {

}

export interface RoleTenantDictionaryDto {
    id: number;
    value: string;
}

export interface UserTenantInsertUpdateDto {
    tenantId?: number;
    roleIds: number[];
    user?: UserTenantDto;
}

export interface UserTenantDto {
    userName: string;
    email: string;
    phone: string;
    password: string;
}

export interface UserTenantReviewDto {
    id: number;
    creationTime: Date;
    creatorUserId: number;
    creatorUserName: string;
    lastModificationTime: Date;
    lastModifierUserId: number;
    lastModifierUserName: string;
    userName: string;
    emailAddress: string;
    name: string;
    surname: string;
    emailConfirmationCode: string;
    lockoutEndDateUtc: Date;
    accessFailedCount: number;
    isLockoutEnabled: boolean;
    phone: string;
    isPhoneNumberConfirmed: boolean;
    isTwoFactorEnabled: boolean;
    isEmailConfirmed: boolean;
    isActive: boolean;
    roleIds: number[];
}