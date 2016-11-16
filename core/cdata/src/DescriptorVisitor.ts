import {Methods} from "./CQueryDescriptor";
import {IFilterDescriptor, IMethod, IOperator} from "./CQuery";
import {forEach} from "@angular/router/src/utils/collection";
export class DescriptorVisitor {
    private path:string = '';
    visit(obj:any){
        let method: IMethod<any>;
        method = <IMethod<any>>obj;
        if (method.method != null && method.value != null) {
            this.visitMethod(method);
            return;
        }

        let operator = <IOperator<any>>obj;
        if(operator.operator != null && operator.value != null) {
            this.visitOperator(operator);
            return;
        }
        if(obj instanceof Array){
            for(let o of obj) {
                this.visit(o);
            };
            return;
        }

        this.visitDescriptor(obj);
    }

    visitDescriptor(descriptor:IFilterDescriptor) {
        let properties = Object.getOwnPropertyNames(descriptor);
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = descriptor[property];
            this.path = this.path + '.' + property;
            this.visit(value);
        }
    }


    visitMethod(method:IMethod<any>) {
        this.visit(method.value);
    }

    visitOperator(operator:IOperator<any>) {
        this.visit(operator.value);
    }
}
