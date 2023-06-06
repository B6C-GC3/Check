
export interface RegisterAccountDto {
    emailAddress: string;
    password: string;
}

export interface RegisterOutput {
    canLogin: boolean;
}