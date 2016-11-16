import { IModel } from "./../index";
import * as Descriptor from "./CQueryDescriptor";
export declare class Projector<T extends IModel> {
    projections: Array<Binding>;
    constructor();
    project(alias: string, property: (x: T) => void): void;
    getProjection(): Binding[];
}
export declare class Binding {
    Key: string;
    Value: Descriptor.INode;
    constructor(key: string, value: Descriptor.INode);
}
export declare class CQuery<T extends IFilterDescriptor> {
    private WhereNode;
    private descriptor;
    constructor(model: IModel, filters: T[], projections?: Binding[]);
    buildProjection(bindings: Binding[]): void;
    getDescriptor(): Descriptor.CQueryDescriptor;
    private buildFilter(obj, path);
    private addBinaryWhere(logicOp, member, compareOp, value);
    private addMethodWhere(logicOp, member, method, value);
    private AppendNode(node);
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
