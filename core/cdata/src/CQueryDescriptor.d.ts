import { IModel } from "./IModel";
export declare class CQueryDescriptor {
    $type: string;
    IncludeParameters: MemberNode[];
    IsMapped: boolean;
    Root: LNode;
    QueryType: QueryType;
    constructor(entryPoint: IModel);
}
export declare class INode {
    $type: string;
    constructor();
}
export declare class LNode extends INode {
    $type: string;
    Left: LNode;
    constructor();
}
export declare class MemberNode extends LNode {
    $type: string;
    Member: string;
    constructor(member: string);
}
export declare class EntryPointNode extends LNode {
    $type: string;
    EntryPointType: string;
    constructor(type: string);
}
export declare class BNode extends LNode {
    $type: string;
    Right: INode;
    constructor();
}
export declare class CallNode extends BNode {
    $type: string;
    Method: string;
    constructor(method: string);
}
export declare class ConstantNode extends INode {
    $type: string;
    Value: any;
    constructor(value: any);
}
export declare class ProjectorNode extends LNode {
    $type: string;
    Bindings: any;
    constructor();
}
export declare class BinaryNode extends BNode {
    $type: string;
    BinaryOperator: BinaryOperator | CompareOperator;
    constructor(binaryOperator: BinaryOperator | CompareOperator);
}
export declare enum BinaryOperator {
    And = 0,
    AndAlso = 1,
    Or = 2,
    OrElse = 3,
}
export declare enum CompareOperator {
    Equal = 4,
    GreaterThan = 5,
    GreaterThanOrEqual = 6,
    LessThan = 7,
    LessThanOrEqual = 8,
}
export declare enum StringMethods {
    Contains = 9,
    StartsWith = 10,
    EndsWith = 11,
}
export declare enum Methods {
    Any = 12,
    In = 13,
}
export declare enum QueryType {
    Default = 0,
    ModelProjection = 1,
    AnonymeProjection = 2,
}
