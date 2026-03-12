import '@sravankumar02/sdk-nestjs-common/lib/utils/extensions/string.extensions';
export declare class UsernameUtils {
    private static dnsContracts;
    static normalizeUsername(username: string): string;
    static getContractAddress(username: string): string;
    static extractUsernameFromRawBase64(rawUsername: string): string;
    private static isBase64;
    static encodeUsername(username: string): string;
}
