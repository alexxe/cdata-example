import { Http } from "@angular/http";
import { IModel } from "./IModel";
import { IFilterDescriptor } from "./CQuery";
export declare abstract class DataModel<TM extends IModel, TD extends IFilterDescriptor> {
    private http;
    private url;
    private model;
    constructor(http: Http, url: string, model: TM);
    filterDescriptors: TD[];
    data: TM[];
    abstract applyFilters(): any;
    refresh(): void;
    private getData(query);
    private post(query);
}
