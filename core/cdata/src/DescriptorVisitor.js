"use strict";
class DescriptorVisitor {
    constructor() {
        this.path = '';
    }
    visit(obj) {
        let method;
        method = obj;
        if (method.method != null && method.value != null) {
            this.visitMethod(method);
            return;
        }
        let operator = obj;
        if (operator.operator != null && operator.value != null) {
            this.visitOperator(operator);
            return;
        }
        if (obj instanceof Array) {
            for (let o of obj) {
                this.visit(o);
            }
            ;
            return;
        }
        this.visitDescriptor(obj);
    }
    visitDescriptor(descriptor) {
        let properties = Object.getOwnPropertyNames(descriptor);
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = descriptor[property];
            this.path = this.path + '.' + property;
            this.visit(value);
        }
    }
    visitMethod(method) {
        this.visit(method.value);
    }
    visitOperator(operator) {
        this.visit(operator.value);
    }
}
exports.DescriptorVisitor = DescriptorVisitor;
//# sourceMappingURL=DescriptorVisitor.js.map