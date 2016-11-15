import {ViewModel} from "../core/cdata/src/ViewModel";
import {ICustomerDtoDescriptor} from "./model/ICustomerDtoDescriptor";
import {Methods, StringMethods} from "../core/cdata/src/CQueryDescriptor";
import {IContactDtoDescriptor} from "./model/IContactDtoDescriptor";
import {CustomerDto} from "./model/CustomerDto";
import {CustomerModel} from "./CustomerModel";
import {IFilterDescriptor} from "../core/cdata/src/CQuery";

export class CustomerViewModel extends ViewModel<CustomerDto,ICustomerDtoDescriptor> {
    constructor() {
        super();

    }


    addFilter(model:CustomerModel,property:string,value:any) {
        if (property === "firma1") {
            model.addCustomerFilter({
                firma1: {
                    operator: StringMethods.Contains,
                    value: value
                }
            });
        }

        if (property === "firma2") {
            model.addCustomerFilter({
                firma2: {
                    operator: StringMethods.Contains,
                    value: value
                }
            });
        }

        if (property === "firstName") {
            model.addContactFilter({
                firstName: {
                    operator: StringMethods.Contains,
                    value: value
                }
            });
        }

        if (property === "lastName") {
            model.addContactFilter({
                lastName: {
                    operator: StringMethods.Contains,
                    value: value
                }
            });
        }

    }


}
