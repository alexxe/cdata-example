/// <reference types="lodash" />
import { DataModel } from "./DataModel";
import { Projection } from "./Projection";
export declare abstract class ViewModel<TP extends Projection> {
    protected model: DataModel<TP>;
    filter: any;
    filterMap: Map<string, Function>;
    constructor(model: DataModel<TP>);
    protected abstract initFilterMap(): any;
    applyFilterState(): void;
}
