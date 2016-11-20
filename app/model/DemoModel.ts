import {DataModel} from "../../core/cdata/src/DataModel";
import {Http} from "@angular/http";
import {QNode, NodeType, MethodType} from "../../core/cdata/src/QNode";
import {DemoProjection} from "./DemoProjection";
import {ContactDto} from "./generated/ContactDto";

export class DemoModel extends DataModel<DemoProjection,ContactDto>{
    constructor(http: Http,url:string) {
        super(http,url);
    }

    getQuery() : QNode {
        let query:QNode = {
            Type: NodeType.Querable,
            Value:""
        };
        let projection:QNode = {
            Type:NodeType.Method,
            Value:MethodType.Select,
            Right:{
                Type:NodeType.Member,
                Value:this.binding(x => x.name,x => x.firstName),
                Left:{
                    Type:NodeType.Member,
                    Value:this.binding(x => x.nachname,x => x.lastName),
                    Left:{
                        Type:NodeType.Member,
                        Value:this.binding(x => x.firma,x => x.customer.firma11),
                        Left:{
                            Type:NodeType.Member,
                            Value:this.binding(x => x.firma1,x => x.customer.firma21)
                        }

                    }
                }
            }
        }
        projection.Left = query;
        return projection;
    }


}
