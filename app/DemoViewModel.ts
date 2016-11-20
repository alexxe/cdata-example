import {ViewModel} from "../core/cdata/src/ViewModel";
import {DemoModel} from "./model/DemoModel";
import {BinaryType} from "../core/cdata/src/QNode";
import {DemoProjection} from "./model/DemoProjection";

export class DemoViewModel extends ViewModel<DemoProjection> {
    constructor(model:DemoModel) {
        super(model);

    }

    configureFilterMap():Map<string,Function> {
        let map = new Map<string,Function>();
        map.set("firma",(value:any) => this.model.addFilter(x => x.firma,BinaryType.Contains, value));
        map.set("firma1",(value:any) => this.model.addFilter(x => x.firma1,BinaryType.Contains, value));
        map.set("vorname",(value:any) => this.model.addFilter(x => x.name,BinaryType.Contains, value));
        map.set("nachname",(value:any) => this.model.addFilter(x => x.nachname,BinaryType.Contains, value));
        return map;
    }







}
