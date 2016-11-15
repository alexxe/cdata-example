import {DataModel} from "../../core/cdata/src/DataModel";
import {Http} from "@angular/http";
import {CustomerDto} from "./CustomerDto";
import {ICustomerDtoDescriptor} from "./ICustomerDtoDescriptor";
import {StringMethods, Methods} from "../../core/cdata/src/CQueryDescriptor";
import {IContactDtoDescriptor} from "./IContactDtoDescriptor";
import {CustomerViewModel} from "../CustomerViewModel";

export class CustomerModel extends DataModel<CustomerDto,ICustomerDtoDescriptor>{
    constructor(http: Http,url:string) {
        super(http,url,new CustomerDto());
        this.customerFilters = [];
        this.contactFilters = [];
    }

    private customerFilters:ICustomerDtoDescriptor[];
    private contactFilters:IContactDtoDescriptor[];

    applyFilters() {
        if (this.contactFilters.length > 0) {
            this.filterDescriptors.push({
                contacts: {
                    method: Methods.Any,
                    value:this.contactFilters
                }
            });
        }

        this.filterDescriptors = this.customerFilters;
    }

    addCustomerFilter(filter:ICustomerDtoDescriptor) {
        this.customerFilters.push(filter);
    }

    addContactFilter(filter:IContactDtoDescriptor) {
        this.contactFilters.push(filter);
    }


}
