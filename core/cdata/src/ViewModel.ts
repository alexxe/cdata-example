import {IFilterDescriptor} from "./CQuery";
import {DataModel} from "./DataModel";
import {IModel} from "./IModel";

export abstract class ViewModel<TM extends IModel,TD extends IFilterDescriptor>  {
    filter: any;
    constructor() {
        this.filter = {};
    }

    abstract addFilter(model:DataModel<TM,TD>,property:any,value:any);

    setFilters(model:DataModel<TM,TD>){
        let filters = Object.getOwnPropertyNames(this.filter);
        for (let i = 0; i < filters.length; i++) {
            let property = filters[i];
            let value = this.filter[property];
            this.addFilter(model,property,value);
        }
    }



}