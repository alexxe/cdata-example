import {DataModel} from "../core/cdata/src/DataModel";
import {Http} from "@angular/http";
import {CustomerDto} from "./model/CustomerDto";
import {ICustomerDtoDescriptor} from "./model/ICustomerDtoDescriptor";
import {StringMethods, Methods} from "../core/cdata/src/CQueryDescriptor";
import {IContactDtoDescriptor} from "./model/IContactDtoDescriptor";
import {CustomerViewModel} from "./CustomerViewModel";
import {QNode, NodeType, MethodType, BinaryType} from "../core/cdata/src/QNode";

export class CustomerModel extends DataModel<CustomerDto,ICustomerDtoDescriptor>{
    constructor(http: Http,url:string) {
        super(http,url,new CustomerDto());
        this.customerFilters = [];
        this.contactFilters = [];
    }

    private customerFilters:Array<QNode>;
    private contactFilters:Array<QNode>;

    applyFilters() :QNode {
        if(this.customerFilters.length == 0) {
            return this.queryable;
        }

        let where:QNode = {
            Type:NodeType.Method,
            Value:MethodType.Where,
            Left:this.queryable
        };

        for(var i = 0; i < this.customerFilters.length; i++) {
            let node = this.customerFilters[i];
            if(i == 0){
                where.Right = node;
            }
            else {
                let binary:QNode = {
                    Type: NodeType.Binary,
                    Value:BinaryType.And,
                    Left:where.Right,
                    Right:node
                };
                where.Right = binary;
            }

        }


        return where;


    }
    customerSort(path: (x:ICustomerDtoDescriptor) => any) {

    }

    contactSort(path: (x:IContactDtoDescriptor) => any) {

    }

    addCustomerFilter(path: (x:ICustomerDtoDescriptor) => any,op:BinaryType,value:any) {
        let filter:QNode;
        filter = {
            Type:NodeType.Binary ,
            Value: op,
            Left:{
                Type:NodeType.Member,
                Value:this.convertLambdaToPath(path)
            },
            Right:{
                Type:NodeType.Constant,
                Value:value
            }
        };
        this.customerFilters.push(filter);
    }

    addContactFilter(path: (x:IContactDtoDescriptor) => any,op:BinaryType,value:any) {
        let filter:QNode;
        filter = {
            Type:NodeType.Binary ,
            Value: op,
            Left:{
                Type:NodeType.Member,
                Value:this.convertLambdaToPath(path)
            },
            Right:{
                Type:NodeType.Constant,
                Value:value
            }
        };
        this.contactFilters.push(filter);
    }

    protected resetModel() {
        this.customerFilters = [];
        this.contactFilters = [];
        super.resetModel();
    }

}
