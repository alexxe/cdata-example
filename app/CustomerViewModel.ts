import {ViewModel} from "../core/cdata/src/ViewModel";
import {CustomerModel} from "./CustomerModel";
import {BinaryType} from "../core/cdata/src/QNode";
import {Projection} from "../core/cdata/src/Projection";
import {CustomerProjection} from "./model/CustomerProjection";

export class CustomerViewModel extends ViewModel<CustomerProjection> {
    constructor(model:CustomerModel) {
        super(model);

    }

    initFilterMap() {
        this.filterMap.set("firma1",(value:any) => this.model.addFilter(x => x.firma,BinaryType.Contains, value));
        this.filterMap.set("firma2",(value:any) => this.model.addFilter(x => x.firma1,BinaryType.Contains, value));
        this.filterMap.set("firstName",(value:any) => this.model.addFilter(x => x.name,BinaryType.Contains, value));
        this.filterMap.set("lastName",(value:any) => this.model.addFilter(x => x.nachname,BinaryType.Contains, value));
    }

    sort(property:string) {
        // let customerModel = <CustomerModel>this.model;
        // if (property === "firma1") {
        //     customerModel.customerSort(x => x.firma1);
        // }
        // if (property === "firma2") {
        //     customerModel.customerSort(x => x.firma2);
        // }
        // if (property === "firstName") {
        //     customerModel.contactSort(x => x.firstName);
        // }
        // if (property === "lastName") {
        //     customerModel.contactSort(x => x.lastName);
        // }
    }

    isSortedByAscending(property:string) :boolean{
        return true;
    }
    isSortedByDescending(property:string) :boolean{
        return false;
    }



}
