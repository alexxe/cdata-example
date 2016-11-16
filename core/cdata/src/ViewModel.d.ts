import { IFilterDescriptor } from "./CQuery";
import { DataModel } from "./DataModel";
import { IModel } from "./IModel";
export declare abstract class ViewModel<TM extends IModel, TD extends IFilterDescriptor> {
    filter: any;
    constructor();
    abstract addFilter(model: DataModel<TM, TD>, property: any, value: any): any;
    setFilters(model: DataModel<TM, TD>): void;
}
