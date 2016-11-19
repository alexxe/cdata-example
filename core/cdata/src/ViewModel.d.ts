import { Projection } from "./IProjection";
import { IDataModel } from "./IDataModel";
import { IModelEntity } from "./IModelEntity";
export declare abstract class ViewModel<TP extends Projection, TM extends IModelEntity> {
    protected model: IDataModel<TM>;
    filter: any;
    filterMap: Map<string, Function>;
    constructor(model: IDataModel<TM>);
    protected abstract initFilterMap(): any;
    applyFilterState(): void;
}
