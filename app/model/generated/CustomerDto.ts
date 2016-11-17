import {ContactDto} from "./ContactDto";
import {IModelEntity} from "../../../core/cdata/src/IModelEntity";

export class CustomerDto implements IModelEntity {
    constructor() {

    }

    id: number;
    edvNr: number;
    firma1: string;
    firma2: string;
    street: string;
    ort: string;
    contacts: ContactDto[];
}
