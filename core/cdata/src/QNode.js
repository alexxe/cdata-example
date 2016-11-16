"use strict";
(function (NodeType) {
    NodeType[NodeType["Querable"] = 0] = "Querable";
    NodeType[NodeType["Member"] = 1] = "Member";
    NodeType[NodeType["Constant"] = 2] = "Constant";
    NodeType[NodeType["Binary"] = 3] = "Binary";
    NodeType[NodeType["Method"] = 4] = "Method";
})(exports.NodeType || (exports.NodeType = {}));
var NodeType = exports.NodeType;
(function (MethodType) {
    MethodType[MethodType["Where"] = 0] = "Where";
    MethodType[MethodType["Select"] = 1] = "Select";
    MethodType[MethodType["Any"] = 2] = "Any";
    MethodType[MethodType["Count"] = 3] = "Count";
    MethodType[MethodType["OrderBy"] = 4] = "OrderBy";
    MethodType[MethodType["OrderByDescending"] = 5] = "OrderByDescending";
})(exports.MethodType || (exports.MethodType = {}));
var MethodType = exports.MethodType;
(function (BinaryType) {
    BinaryType[BinaryType["And"] = 0] = "And";
    BinaryType[BinaryType["Or"] = 1] = "Or";
    BinaryType[BinaryType["Equal"] = 2] = "Equal";
    BinaryType[BinaryType["GreaterThan"] = 3] = "GreaterThan";
    BinaryType[BinaryType["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
    BinaryType[BinaryType["LessThan"] = 5] = "LessThan";
    BinaryType[BinaryType["LessThanOrEqual"] = 6] = "LessThanOrEqual";
    BinaryType[BinaryType["Contains"] = 7] = "Contains";
    BinaryType[BinaryType["StartsWith"] = 8] = "StartsWith";
    BinaryType[BinaryType["EndsWith"] = 9] = "EndsWith";
    BinaryType[BinaryType["In"] = 10] = "In";
})(exports.BinaryType || (exports.BinaryType = {}));
var BinaryType = exports.BinaryType;
//# sourceMappingURL=QNode.js.map