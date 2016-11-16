"use strict";
class CQueryDescriptor {
    constructor(entryPoint) {
        this
            .$type =
            "Covis.Data.DynamicLinq.CQuery.Contracts.QueryDescriptor, Covis.Data.DynamicLinq.CQuery.Contracts";
        this.Root = new EntryPointNode(entryPoint.type);
        this.IncludeParameters = [];
        this.IsMapped = false;
        this.QueryType = QueryType.Default;
    }
}
exports.CQueryDescriptor = CQueryDescriptor;
class INode {
    constructor() {
        this.$type = "Covis.Data.DynamicLinq.CQuery.Contracts.Model.INode, Covis.Data.DynamicLinq.CQuery.Contracts";
    }
}
exports.INode = INode;
class LNode extends INode {
    constructor() {
        super();
        this.$type = "Covis.Data.DynamicLinq.CQuery.Contracts.Model.LNode, Covis.Data.DynamicLinq.CQuery.Contracts";
    }
}
exports.LNode = LNode;
class MemberNode extends LNode {
    constructor(member) {
        super();
        this
            .$type =
            "Covis.Data.DynamicLinq.CQuery.Contracts.Model.MemberNode, Covis.Data.DynamicLinq.CQuery.Contracts";
        this.Member = member;
    }
}
exports.MemberNode = MemberNode;
class EntryPointNode extends LNode {
    constructor(type) {
        super();
        this.EntryPointType = type;
        this
            .$type =
            "Covis.Data.DynamicLinq.CQuery.Contracts.Model.EntryPointNode, Covis.Data.DynamicLinq.CQuery.Contracts";
    }
}
exports.EntryPointNode = EntryPointNode;
class BNode extends LNode {
    constructor() {
        super();
        this.$type = "Covis.Data.DynamicLinq.CQuery.Contracts.Model.BNode, Covis.Data.DynamicLinq.CQuery.Contracts";
    }
}
exports.BNode = BNode;
class CallNode extends BNode {
    constructor(method) {
        super();
        this
            .$type =
            "Covis.Data.DynamicLinq.CQuery.Contracts.Model.CallNode, Covis.Data.DynamicLinq.CQuery.Contracts";
        this.Method = method;
    }
}
exports.CallNode = CallNode;
class ConstantNode extends INode {
    constructor(value) {
        super();
        this
            .$type =
            "Covis.Data.DynamicLinq.CQuery.Contracts.Model.ConstantNode, Covis.Data.DynamicLinq.CQuery.Contracts";
        this.Value = value;
    }
}
exports.ConstantNode = ConstantNode;
class ProjectorNode extends LNode {
    constructor() {
        super();
        this
            .$type =
            "Covis.Data.DynamicLinq.CQuery.Contracts.Model.ProjectorNode, Covis.Data.DynamicLinq.CQuery.Contracts";
        this.Bindings = [];
    }
}
exports.ProjectorNode = ProjectorNode;
class BinaryNode extends BNode {
    constructor(binaryOperator) {
        super();
        this
            .$type =
            "Covis.Data.DynamicLinq.CQuery.Contracts.Model.BinaryNode, Covis.Data.DynamicLinq.CQuery.Contracts";
        this.BinaryOperator = binaryOperator;
    }
}
exports.BinaryNode = BinaryNode;
(function (BinaryOperator) {
    BinaryOperator[BinaryOperator["And"] = 0] = "And";
    BinaryOperator[BinaryOperator["AndAlso"] = 1] = "AndAlso";
    BinaryOperator[BinaryOperator["Or"] = 2] = "Or";
    BinaryOperator[BinaryOperator["OrElse"] = 3] = "OrElse";
})(exports.BinaryOperator || (exports.BinaryOperator = {}));
var BinaryOperator = exports.BinaryOperator;
(function (CompareOperator) {
    CompareOperator[CompareOperator["Equal"] = 4] = "Equal";
    CompareOperator[CompareOperator["GreaterThan"] = 5] = "GreaterThan";
    CompareOperator[CompareOperator["GreaterThanOrEqual"] = 6] = "GreaterThanOrEqual";
    CompareOperator[CompareOperator["LessThan"] = 7] = "LessThan";
    CompareOperator[CompareOperator["LessThanOrEqual"] = 8] = "LessThanOrEqual";
})(exports.CompareOperator || (exports.CompareOperator = {}));
var CompareOperator = exports.CompareOperator;
(function (StringMethods) {
    StringMethods[StringMethods["Contains"] = 9] = "Contains";
    StringMethods[StringMethods["StartsWith"] = 10] = "StartsWith";
    StringMethods[StringMethods["EndsWith"] = 11] = "EndsWith";
})(exports.StringMethods || (exports.StringMethods = {}));
var StringMethods = exports.StringMethods;
(function (Methods) {
    Methods[Methods["Any"] = 12] = "Any";
    Methods[Methods["In"] = 13] = "In";
})(exports.Methods || (exports.Methods = {}));
var Methods = exports.Methods;
(function (QueryType) {
    QueryType[QueryType["Default"] = 0] = "Default";
    QueryType[QueryType["ModelProjection"] = 1] = "ModelProjection";
    QueryType[QueryType["AnonymeProjection"] = 2] = "AnonymeProjection";
})(exports.QueryType || (exports.QueryType = {}));
var QueryType = exports.QueryType;
//# sourceMappingURL=CQueryDescriptor.js.map