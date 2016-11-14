

import {IModel} from "./../index";
import  * as Descriptor from "./CQueryDescriptor";

export class Projector<T extends IModel> {
    projections: Array<Binding>;
    constructor() {
        this.projections = [];
    }
    project(alias: string, property: (x: T) => void) {
        let p = property.toString().split('.');
        var path;
        for (var i = 1; i < p.length; i++) {
            if (path === undefined) {
                path = p[i];
            } else {
                path = path + "." + p[i];
            }
            
        }
        let binding = new Binding(alias,new Descriptor.MemberNode(path.split(';')[0]));
        
        this.projections.push(binding);
    }

    getProjection() {
        return this.projections;
    }
}


export class Binding {
    Key: string;
    Value:Descriptor.INode;
    constructor(key: string, value: Descriptor.INode) {
        this.Key = key;
        this.Value = value;
    }
    
}


    export class CQuery<T extends IFilterDescriptor> {
        private WhereNode: Descriptor.CallNode;
        private descriptor: Descriptor.CQueryDescriptor;
        constructor(model: IModel,filters: T[],projections?:Binding[]) {
            this.descriptor = new Descriptor.CQueryDescriptor(model);
            for (var i = 0; i < filters.length; i++) {
                this.buildFilter(filters[i], "");
            }

            if(projections != null) {
                this.buildProjection(projections);
            }
            
        }

        buildProjection(bindings: Binding[]) {
            var node = new Descriptor.ProjectorNode();
            node.Bindings = bindings;
            node.Left = this.descriptor.Root;
            this.descriptor.Root = node;
            this.descriptor.QueryType = Descriptor.QueryType.AnonymeProjection;
        }

        getDescriptor(): Descriptor.CQueryDescriptor {
            return this.descriptor;
        }
        private buildFilter(obj: IFilterDescriptor, path: string) {
            let properties = Object.getOwnPropertyNames(obj);
            for (let i = 0; i < properties.length; i++) {
                let property = properties[i];
                let value = obj[property];
                let operator = <IOperator<any>>value;
                let method = <IMethod<any>>value;
                if (method.method != null) {
                    //let track = new Tracker();
                    //track.path = path + "." + property;
                    //track.operator = method.method;
                    //track.value = method.filter;
                    //this.tracker.push(track);
                }
                else if (operator.value == null) {
                    let member = "";
                    if (path !== "") {
                        member = path + "." + property;
                    } else {
                        member = property;
                    }
                    this.buildFilter(value, member);
                }
                else if (operator.value instanceof Array){
                    let member = "";
                    if (path !== "") {
                        member = path + "." + property;
                    } else {
                        member = property;
                    }
                    this.addMethodWhere(Descriptor.BinaryOperator.And, member, Descriptor.Methods.In, value.value);
                }
                else {
                    let member = "";
                    if (path !== "") {
                        member = path + "." + property;
                    } else {
                        member = property;
                    }
                    if (Descriptor.CompareOperator[value.operator] !== undefined) {
                        this.addBinaryWhere(Descriptor.BinaryOperator.And, member, value.operator, value.value);
                    } else {
                        this.addMethodWhere(Descriptor.BinaryOperator.And, member, value.operator, value.value);
                    } 
                }

                //let o = filter[properties[i]];
                //let isMethod = (<IMethod<any>>o).method !== undefined;
                //if ((<IOperator<any>>o).value !== undefined && (<IOperator<any>>o).operator !== undefined) {
                //    let operator = (<IOperator<any>>o).operator;
                //    let value = (<IOperator<any>>o).value;
                //}
                //let isInOperator = (<IInOperator<any>>o).value !== undefined;
            }
        }

        

        private addBinaryWhere(logicOp: Descriptor.BinaryOperator, member: string, compareOp: Descriptor.CompareOperator, value: any) {
            let binaryNode = new Descriptor.BinaryNode(compareOp);
            binaryNode.Left = new Descriptor.MemberNode(member);
            binaryNode.Right = new Descriptor.ConstantNode(value);

            if (this.WhereNode == null) {
                this.WhereNode = new Descriptor.CallNode("Where");
                this.WhereNode.Right = binaryNode;
                this.AppendNode(this.WhereNode);
            } else {
                let andNode = new Descriptor.BinaryNode(logicOp);
                andNode.Left = this.WhereNode.Right as Descriptor.LNode;
                andNode.Right = binaryNode;

                this.WhereNode.Right = andNode;
            }


        }

        private addMethodWhere(logicOp: Descriptor.BinaryOperator, member: string, method: Descriptor.Methods | Descriptor.StringMethods, value: any) {
            let methodName;
            if (Descriptor.StringMethods[method] !== undefined) {
                methodName = Descriptor.StringMethods[method].toString();
            }
            else if (Descriptor.Methods[method] !== undefined) {
                methodName = Descriptor.Methods[method].toString();
            } else {
                alert("unbekannte method" + method);
            }
            let callNode = new Descriptor.CallNode(methodName);
            callNode.Left = new Descriptor.MemberNode(member);
            callNode.Right = new Descriptor.ConstantNode(value);

            if (this.WhereNode == null) {
                let call = new Descriptor.CallNode("Where");
                call.Right = callNode;
                this.AppendNode(call);
            }
            else {
                let andNode = new Descriptor.BinaryNode(logicOp);
                andNode.Left = this.WhereNode.Right as Descriptor.LNode;
                andNode.Right = callNode;
                this.WhereNode.Right = andNode;
            }


        }

        private AppendNode(node: Descriptor.BNode) {
            node.Left = this.descriptor.Root;
            this.descriptor.Root = node;
        }
    }

    export interface IFilter<T extends IModel> {
        operator: Descriptor.CompareOperator | Descriptor.StringMethods;
    }

    export interface IFilterDescriptor {

    }

    export interface IOperator<T> {
        operator: Descriptor.CompareOperator | Descriptor.StringMethods;
        value: T;
    }

    export interface IInOperator<T> {
        value: T[];
    }

    export interface IMethod<T extends IFilterDescriptor> {
        method: Descriptor.Methods;
        value: T;
    }




