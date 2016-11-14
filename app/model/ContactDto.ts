import {IModel} from "../../core/cdata/src/IModel";
import {CustomerDto} from "./CustomerDto";


    export class ContactDto implements IModel{
		type: string;
		constructor() {
			this.type = "Example.Data.Contract.Model.ContactDto,Example.Data.Contract";
			
                    
        }      
        
		
		id: string;
		edvNr: string;
		firstName: string;
		lastName: string;
		street: string;
		ort: string;
		customer: CustomerDto;
    }
