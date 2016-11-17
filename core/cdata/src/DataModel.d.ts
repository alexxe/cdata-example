import { Http } from "@angular/http";
import { QNode } from "./QNode";
import { BinaryType } from "./QNode";
import { Projection } from "./Projection";
export declare class DataModel<TP extends Projection> {
    private http;
    private url;
    constructor(http: Http, url: string);
    protected projection: QNode;
    private filters;
    private includes;
    data: TP[];
    addFilter(path: (x: TP) => any, op: BinaryType, value: any): void;
    private buildFilter();
    refresh(): void;
    protected resetModel(): void;
    private getData(query);
    private post(query);
    protected convertLambdaToPath(lambda: any): string;
}
