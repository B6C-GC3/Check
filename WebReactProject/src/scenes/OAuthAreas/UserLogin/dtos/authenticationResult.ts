export interface AuthenticationResult {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number
    userId: number
}