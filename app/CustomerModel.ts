import {DataModel} from "../core/cdata/src/DataModel";
import {Http} from "@angular/http";
import {CustomerDto} from "./model/CustomerDto";
import {CustomerViewModel} from "./CustomerViewModel";
import {QNode, NodeType, MethodType, BinaryType} from "../core/cdata/src/QNode";
import {CustomerProjection} from "./model/CustomerProjection";
import {ContactDto} from "./model/ContactDto";

export class CustomerModel extends DataModel<CustomerProjection>{
    constructor(http: Http,url:string) {
        super(http,url);

        let queryable:QNode = {
            Type:NodeType.Querable,
            Value:new ContactDto().constructor.name
        };

        this.projection = {
            Type:NodeType.Method,
            Value:MethodType.Select,
            Left:queryable,
            Right:{
                Type:NodeType.Member,
                Value:"name:firstName",
                Left:{
                    Type:NodeType.Member,
                    Value:"nachname:lastName",
                    Left:{
                        Type:NodeType.Member,
                        Value:"firma:customer.firma1",
                        Left:{
                            Type:NodeType.Member,
                            Value:"firma1:customer.firma2"
                        }
                    }
                }
            }
        }
    }

    protected resetModel() {
        super.resetModel();
    }

}
