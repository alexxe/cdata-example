import {ViewModel} from "../core/cdata/src/ViewModel";
import {ICustomerDtoDescriptor} from "./model/ICustomerDtoDescriptor";
import {Methods, StringMethods} from "../core/cdata/src/CQueryDescriptor";
import {IContactDtoDescriptor} from "./model/IContactDtoDescriptor";
import {CustomerDto} from "./model/CustomerDto";
import {CustomerModel} from "./model/CustomerModel";
import {IFilterDescriptor} from "../core/cdata/src/CQuery";

export class CustomerViewModel extends ViewModel<CustomerDto,ICustomerDtoDescriptor> {
    constructor() {
        super();

    }


    addFilter(model:CustomerModel,property:string,value:any) {
        if (property === "firma1") {
            let filter:ICustomerDtoDescriptor = {
                firma1: {
                    operator: StringMethods.Contains,
                    value: value
                }
            };
            model.addCustomerFilter(filter);
        }

        if (property === "firma2") {
            let filter:ICustomerDtoDescriptor = {
                firma2: {
                    operator: StringMethods.Contains,
                    value: value
                }
            };
            model.addCustomerFilter(filter);
        }

        if (property === "firstName") {
            let filter:IContactDtoDescriptor = {
                firstName: {
                    operator: StringMethods.Contains,
                    value: value
                }
            };
            model.addContactFilter(filter);
        }

        if (property === "lastName") {
            let filter:IContactDtoDescriptor = {
                lastName: {
                    operator: StringMethods.Contains,
                    value: value
                }
            };
            model.addContactFilter(filter);
        }

    }


}
