import { Projection } from "./Projection";
export declare class DataRow<TP extends Projection> {
    private source;
    constructor(source: TP);
    values: string[];
}
