import {IContact} from "./IContact";
export interface ICustomer
{
    "name"?: string;
    "email"?: string;
    "regDate"?: Date;
    "city"?: string;
    "contacts"?: Array<IContact>;
}