import {BinaryType} from "./QNode";
import {IModelEntity} from "./IModelEntity";
/**
 * Created by user on 11/17/2016.
 */
export interface IDataModel<TM extends IModelEntity> {
    addFilter(path: (x:TM) => any,op:BinaryType,value:any);
    sort(property:string);
    refresh();
}











