import {DataModel} from "./DataModel";
import {Projection} from "./Projection";

export abstract class ViewModel<TP extends Projection>  {
    filter: any;
    filterMap:Map<string,Function>;
    constructor(protected model:DataModel<TP>) {
        this.filter = {};
        this.filterMap = new Map();
        this.initFilterMap();
    }
    protected abstract initFilterMap();


    applyFilterState(){
        let filters = Object.getOwnPropertyNames(this.filter);
        for (let i = 0; i < filters.length; i++) {
            let property = filters[i];
            let value = this.filter[property];
            let f = this.filterMap.get(property);
            f.call(this.model,value);
        }
    }



}