import {Methods} from "./CQueryDescriptor";
import {IFilterDescriptor, IMethod, IOperator} from "./CQuery";
export class DescriptorVisitor {

    visit(obj:any){
        let method: IMethod<any>;
        method = <IMethod<any>>obj;
        if (method.method != null) {
            this.visitMethod(method);
        }

        let operator = <IOperator<any>>obj;
        if(operator.value == null) {

        }
    }

    visitDescriptor(descriptor:IFilterDescriptor) {
        let properties = Object.getOwnPropertyNames(descriptor);
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = descriptor[property];
            this.visit(value);
        }
    }


    visitMethod(method:IMethod<any>) {

    }

    visitMethod1(method:IMethod<any>) {

    }
}
