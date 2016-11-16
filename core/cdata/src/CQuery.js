"use strict";
const Descriptor = require("./CQueryDescriptor");
const CQueryDescriptor_1 = require("./CQueryDescriptor");
class Projector {
    constructor() {
        this.projections = [];
    }
    project(alias, property) {
        let p = property.toString().split('.');
        var path;
        for (var i = 1; i < p.length; i++) {
            if (path === undefined) {
                path = p[i];
            }
            else {
                path = path + "." + p[i];
            }
        }
        let binding = new Binding(alias, new Descriptor.MemberNode(path.split(';')[0]));
        this.projections.push(binding);
    }
    getProjection() {
        return this.projections;
    }
}
exports.Projector = Projector;
class Binding {
    constructor(key, value) {
        this.Key = key;
        this.Value = value;
    }
}
exports.Binding = Binding;
class CQuery {
    constructor(model, filters, projections, includes) {
        this.descriptor = new Descriptor.CQueryDescriptor(model);
        for (var i = 0; i < filters.length; i++) {
            this.buildFilter(filters[i], "");
        }
        if (projections != null) {
            this.buildProjection(projections);
        }
        if (includes.length > 0) {
            this.buildIncludes(includes);
        }
    }
    buildIncludes(includes) {
        for (var i = 0; i < includes.length; i++) {
            this.descriptor.IncludeParameters.push(new Descriptor.MemberNode(includes[i]));
        }
    }
    buildProjection(bindings) {
        var node = new Descriptor.ProjectorNode();
        node.Bindings = bindings;
        node.Left = this.descriptor.Root;
        this.descriptor.Root = node;
        this.descriptor.QueryType = Descriptor.QueryType.AnonymeProjection;
    }
    getDescriptor() {
        return this.descriptor;
    }
    buildFilter(obj, path) {
        let properties = Object.getOwnPropertyNames(obj);
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = obj[property];
            let operator = value;
            let method = value;
            if (method.method != null) {
                this.addMethod(method.method);
                this.buildFilter(method.value.descriptor, "");
            }
            else if (operator.value == null) {
                let member = "";
                if (path !== "") {
                    member = path + "." + property;
                }
                else {
                    member = property;
                }
                this.buildFilter(value, member);
            }
            else if (operator.value instanceof Array) {
                let member = "";
                if (path !== "") {
                    member = path + "." + property;
                }
                else {
                    member = property;
                }
                this.addMethodWhere(Descriptor.BinaryOperator.And, member, Descriptor.Methods.In, value.value);
            }
            else {
                let member = "";
                if (path !== "") {
                    member = path + "." + property;
                }
                else {
                    member = property;
                }
                if (Descriptor.CompareOperator[value.operator] !== undefined) {
                    this.addBinaryWhere(Descriptor.BinaryOperator.And, member, value.operator, value.value);
                }
                else {
                    this.addMethodWhere(Descriptor.BinaryOperator.And, member, value.operator, value.value);
                }
            }
        }
    }
    addBinaryWhere(logicOp, member, compareOp, value) {
        let binaryNode = new Descriptor.BinaryNode(compareOp);
        binaryNode.Left = new Descriptor.MemberNode(member);
        binaryNode.Right = new Descriptor.ConstantNode(value);
        if (this.WhereNode == null) {
            this.WhereNode = new Descriptor.CallNode("Where");
            this.WhereNode.Right = binaryNode;
            this.AppendNode(this.WhereNode);
        }
        else {
            let andNode = new Descriptor.BinaryNode(logicOp);
            andNode.Left = this.WhereNode.Right;
            andNode.Right = binaryNode;
            this.WhereNode.Right = andNode;
        }
    }
    addMethod(method) {
        if (method === CQueryDescriptor_1.Methods.Any) {
        }
    }
    addMethodWhere(logicOp, member, method, value) {
        let methodName;
        if (Descriptor.StringMethods[method] !== undefined) {
            methodName = Descriptor.StringMethods[method].toString();
        }
        else if (Descriptor.Methods[method] !== undefined) {
            methodName = Descriptor.Methods[method].toString();
        }
        else {
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
            andNode.Left = this.WhereNode.Right;
            andNode.Right = callNode;
            this.WhereNode.Right = andNode;
        }
    }
    AppendNode(node) {
        node.Left = this.descriptor.Root;
        this.descriptor.Root = node;
    }
}
exports.CQuery = CQuery;
//# sourceMappingURL=CQuery.js.map