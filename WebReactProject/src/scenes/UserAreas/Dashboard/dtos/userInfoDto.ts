
export enum UserInfoSexeUL {
    Male = 0,
    Female = 1,
    Other = 2
}

export interface UserInfoDto {
    name: string;
    sexe: UserInfoSexeUL;
    email: string;
    numberPhone: string;
    nationality: number | null;
    dateOfBirth: string | null;
    avatarUrl: string;
    nickname: string;
}

export interface UserInfoResDto {
    name: string;
    sexe: UserInfoSexeUL;
    email: string;
    numberPhone: string;
    nationality: number | null;
    dateOfBirth: string | null;
    avatarUrl: string;
    nickname: string;
}