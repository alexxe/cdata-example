

    
    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
    import {IFilterDescriptor, IOperator, IInOperator, IMethod} from "../../core/cdata/src/CQuery";
    import {IContactDtoDescriptor} from "./IContactDtoDescriptor";
    
    export interface ICustomerDtoDescriptor extends IFilterDescriptor {
        
        // ID
        id?: IOperator<string> | IInOperator<string>;
        // EDVNR
        edvNr?: IOperator<string> | IInOperator<string>;
        // CUSTOMERNR
        customerNr?: IOperator<string> | IInOperator<string>;
        // FIRMA1
        firma1?: IOperator<string> | IInOperator<string>;
        // FIRMA2
        firma2?: IOperator<string> | IInOperator<string>;
        // SHORTNAME
        shortName?: IOperator<string> | IInOperator<string>;
        // STREET
        street?: IOperator<string> | IInOperator<string>;
        // ORT
        ort?: IOperator<string> | IInOperator<string>;
        // CONTACTS
        contacts?: IMethod<IContactDtoDescriptor>;
        
    } 
