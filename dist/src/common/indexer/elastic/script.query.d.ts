import { AbstractQuery } from "@sravankumar02/sdk-nestjs-elastic";
export declare class ScriptQuery extends AbstractQuery {
    private readonly source;
    constructor(source: string | undefined);
    getQuery(): any;
}
