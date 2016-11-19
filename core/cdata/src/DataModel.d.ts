import { Http } from "@angular/http";
import { QNode } from "./QNode";
import { BinaryType } from "./QNode";
import { Projection } from "./IProjection";
import { IModelEntity } from "./IModelEntity";
import { IDataModel } from "./IDataModel";
export declare class DataModel<TP extends Projection, TM extends IModelEntity> implements IDataModel<TM> {
    private http;
    private url;
    constructor(http: Http, url: string, modelEntry: IModelEntity);
    private queryable;
    protected projection: QNode;
    private filters;
    private includes;
    data: TP[];
    binding(p: ((x: TP) => void), m: ((x: TM) => void)): string;
    addFilter(path: (x: TM) => any, op: BinaryType, value: any): void;
    private buildQuery();
    refresh(): void;
    protected resetModel(): void;
    private getData(query);
    private post(query);
    protected convertLambdaToPath(lambda: any): string;
}
