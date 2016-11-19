import {IProjection} from "./IProjection";
import {IDataModel} from "./IDataModel";
import {IModelEntity} from "./IModelEntity";
import {DataRow} from "./DataRow";

export abstract class ViewModel<TP extends IProjection,TM extends IModelEntity>  {
    filter: any;
    filterMap:Map<string,Function>;
    data:DataRow<TP>[];
    sorting: string[];
    constructor(protected model:IDataModel<TM>) {
        this.filter = {};
        this.sorting = [];
        this.filterMap = new Map<string,Function>();
        this.initFilterMap();
    }
    protected abstract initFilterMap();


    private applyFilterState(){
        let filters = Object.getOwnPropertyNames(this.filter);
        for (let i = 0; i < filters.length; i++) {
            let property = filters[i];
            let value = this.filter[property];
            let f = this.filterMap.get(property);
            f.call(this.model,value);
        }
    }

    isSortedByAscending(property:string) :boolean{
        return true;
    }

    isSortedByDescending(property:string) :boolean{
        return false;
    }

    sort(property:string){
        this.applyFilterState();
        this.model.sort(property).subscribe(
            data => {
                this.data = data;
            });
    }

    refresh(){
        this.applyFilterState();
        this.model.refresh().subscribe(
            data => {
                this.data = data;
                if (this.sorting.length == 0) {
                    this.sorting = data[0].properties;
                }
            });
    }
}