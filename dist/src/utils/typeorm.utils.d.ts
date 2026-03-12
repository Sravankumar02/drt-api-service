export declare class TypeormUtils {
    static textToStringArrayTransformer: {
        to: (value: string[]) => string;
        from: (value: string) => string[];
    };
    static textToNumberArrayTransformer: {
        to: (value: number[]) => string;
        from: (value: string) => number[];
    };
}
