

    
    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    
    import {IFilterDescriptor, IOperator, IInOperator} from "../../core/cdata/src/CQuery";
    import {ICustomerDtoDescriptor} from "./ICustomerDtoDescriptor";


    export interface IContactDtoDescriptor extends IFilterDescriptor {
        
        // ID
        id?: IOperator<string> | IInOperator<string>;
        // EDVNR
        edvNr?: IOperator<string> | IInOperator<string>;
        // FIRSTNAME
        firstName?: IOperator<string> | IInOperator<string>;
        // LASTNAME
        lastName?: IOperator<string> | IInOperator<string>;
        // STREET
        street?: IOperator<string> | IInOperator<string>;
        // ORT
        ort?: IOperator<string> | IInOperator<string>;
        // CUSTOMER
        customer?: ICustomerDtoDescriptor;
        
    } 
