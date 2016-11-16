import {ViewModel} from "../core/cdata/src/ViewModel";
import {ICustomerDtoDescriptor} from "./model/ICustomerDtoDescriptor";
import {Methods, StringMethods} from "../core/cdata/src/CQueryDescriptor";
import {IContactDtoDescriptor} from "./model/IContactDtoDescriptor";
import {CustomerDto} from "./model/CustomerDto";
import {CustomerModel} from "./CustomerModel";
import {IFilterDescriptor} from "../core/cdata/src/CQuery";
import {DescriptorVisitor} from "../core/cdata/src/DescriptorVisitor";
import {NodeType, QNode, MethodType, BinaryType} from "../core/cdata/src/QNode";

export class CustomerViewModel extends ViewModel<CustomerDto,ICustomerDtoDescriptor> {
    constructor(model:CustomerModel) {
        super(model);
        let f :Function = model.addCustomerFilter(x => x.firma1,BinaryType.Contains, 0);
        this.filterMap.set("firma1",f);
    }


    addFilter(property:string,value:any) {
        let customerModel = <CustomerModel>this.model;
        if (property === "firma1") {
            let f = this.filterMap.get("firma1");
            f.call(value);
            customerModel.addCustomerFilter(x => x.firma1,BinaryType.Contains, value);
        }

        if (property === "firma2") {
            customerModel.addCustomerFilter(x => x.firma2,BinaryType.Contains, value);
        }

        if (property === "firstName") {
            customerModel.addContactFilter(x => x.firstName,BinaryType.Contains, value);
        }

        if (property === "lastName") {
            customerModel.addContactFilter(x => x.lastName,BinaryType.Contains, value);
        }
    }

    sort(property:string) {
        let customerModel = <CustomerModel>this.model;
        if (property === "firma1") {
            customerModel.customerSort(x => x.firma1);
        }
        if (property === "firma2") {
            customerModel.customerSort(x => x.firma2);
        }
        if (property === "firstName") {
            customerModel.contactSort(x => x.firstName);
        }
        if (property === "lastName") {
            customerModel.contactSort(x => x.lastName);
        }
    }

    isSortedByAscending(property:string) :boolean{
        return true;
    }
    isSortedByDescending(property:string) :boolean{
        return false;
    }



}
