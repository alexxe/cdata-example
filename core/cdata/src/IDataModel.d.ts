import { BinaryType } from "./QNode";
import { IModelEntity } from "./IModelEntity";
export interface IDataModel<TM extends IModelEntity> {
    addFilter(path: (x: TM) => any, op: BinaryType, value: any): any;
}
