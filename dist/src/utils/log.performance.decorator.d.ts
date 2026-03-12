interface ILogPerformanceOptions {
    argIndex: number;
}
export declare function LogPerformanceAsync(method: string, ...decoratorArgs: Array<string | ILogPerformanceOptions>): (target: Object, _key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export {};
