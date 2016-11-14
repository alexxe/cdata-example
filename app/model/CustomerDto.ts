


    import {IModel} from "../../core/cdata/src/IModel";
	import {ContactDto} from "./ContactDto";

	export class CustomerDto implements IModel{
		type: string;
		constructor() {
			this.type = "Example.Data.Contract.Model.CustomerDto,Example.Data.Contract";
			
                    
        }      
        
		
		id: string;
		edvNr: string;
		customerNr: string;
		firma1: string;
		firma2: string;
		shortName: string;
		street: string;
		ort: string;
		contacts: ContactDto[];
    }
