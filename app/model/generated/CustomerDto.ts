import {ContactDto} from "./ContactDto";
import {IModelEntity} from "../../../core/cdata/src/IModelEntity";

export class CustomerDto implements IModelEntity {
    constructor() {

    }

    id: number;
    edvNr: number;
    firma11: string;
    firma21: string;
    street: string;
    contacts: ContactDto[];
}
