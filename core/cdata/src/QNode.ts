/**
 * Created by dle on 16.11.2016.
 */
export interface QNode
{
    Type:NodeType;
    Left?:QNode;
    Right?:QNode;
    Value:any;
}

export enum NodeType
{
    Querable = 0,
    Member = 1,
    Constant = 2,
    Binary = 3,
    Method = 4

}

export enum MethodType
{
    Where = 0,
    Select = 1,
    Any = 2,
    Count = 3,
    OrderBy = 4,
    OrderByDescending = 5

}

export enum BinaryType
{
    And = 0,
    Or = 1,
    Equal = 2,
    GreaterThan = 3,
    GreaterThanOrEqual = 4,
    LessThan = 5,
    LessThanOrEqual = 6,
    Contains = 7,
    StartsWith = 8,
    EndsWith = 9,
    In = 10

}