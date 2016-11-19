import {ViewModel} from "../core/cdata/src/ViewModel";
import {CustomerModel} from "./CustomerModel";
import {BinaryType} from "../core/cdata/src/QNode";
import {CustomerContactProjection} from "./model/CustomerContactProjection";
import {ContactDto} from "./model/generated/ContactDto";

export class CustomerViewModel extends ViewModel<CustomerContactProjection,ContactDto> {
    constructor(model:CustomerModel) {
        super(model);

    }

    configureFilterMap():Map<string,Function> {
        let map = new Map<string,Function>();
        map.set("firma",(value:any) => this.model.addFilter(x => x.customer.firma11,BinaryType.Contains, value));
        map.set("firma1",(value:any) => this.model.addFilter(x => x.customer.firma21,BinaryType.Contains, value));
        map.set("vorname",(value:any) => this.model.addFilter(x => x.firstName,BinaryType.Contains, value));
        map.set("nachname",(value:any) => this.model.addFilter(x => x.lastName,BinaryType.Contains, value));
        return map;
    }







}
