import {ICustomer} from "./ICustomer";
/**
 * Created by user on 11/13/2016.
 */
export interface IContact
{
    "name"?: string;
    "email"?: string;
    "regDate"?: Date;
    "city"?: string,
    "age"?: number;
    "customer"?: ICustomer;
}

