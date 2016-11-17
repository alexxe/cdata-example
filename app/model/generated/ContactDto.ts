import {IModelEntity} from "../../../core/cdata/src/IModelEntity";
import {CustomerDto} from "./CustomerDto";


export class ContactDto implements IModelEntity {
    constructor() {
    }


    id: number;
    edvNr: number;
    firstName: string;
    lastName: string;
    street: string;
    ort: string;
    customer: CustomerDto;
}
