import {ViewModel} from "../core/cdata/src/ViewModel";
import {ICustomerDtoDescriptor} from "./model/ICustomerDtoDescriptor";
import {Methods, StringMethods} from "../core/cdata/src/CQueryDescriptor";
import {IContactDtoDescriptor} from "./model/IContactDtoDescriptor";
import {CustomerDto} from "./model/CustomerDto";
import {CustomerModel} from "./CustomerModel";
import {IFilterDescriptor} from "../core/cdata/src/CQuery";
import {DescriptorVisitor} from "../core/cdata/src/DescriptorVisitor";

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
        this.staticFilter1();
    }

    addFilter1(model:CustomerModel,property:string,value:any) {
        if (property === "firma1") {
            model.addFilter(x => x.firma1,StringMethods.Contains,value);
        }

        if (property === "firma2") {
            model.addFilter(x => x.firma2,StringMethods.Contains,value);
        }

        if (property === "firstName") {
            model.addFilter(x => x.contacts[0].firstName,StringMethods.Contains,value);
        }

        if (property === "lastName") {
            model.addFilter(x => x.contacts[0].lastName,StringMethods.Contains,value);
        }

    }

    staticFilter() {
        let filter = <ICustomerDtoDescriptor>{
            firma1:{
                operator:StringMethods.Contains,
                value:"s"
            },
            contacts: {
                method:Methods.Any,
                value:{
                    firstName: {
                        operator:StringMethods.Contains,
                        value:"w"}
                }
            }
        }

    }

    staticFilter1() {
        let filter:IContactDtoDescriptor;
        filter = {
            firstName:{
                operator:StringMethods.Contains,
                value:"s"
            },
            customer: {
                firma1:{
                    operator:StringMethods.EndsWith,
                    value:"w"
                }


            }
        }

        let v = new DescriptorVisitor();
        v.visitDescriptor(filter);

    }


}
