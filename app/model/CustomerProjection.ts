import {Projection} from "../../core/cdata/src/Projection";
export class CustomerProjection extends Projection{
    firma: string;
    firma1: string;
    name: string;
    nachname: string;
    values():string[] {
        let values:string[] = [];

        let properties = Object.getOwnPropertyNames(this);
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = this[property];
            values.push(value);
        }
        return values;
    }

    test():string[] {
        let r = [];
        r.push("w");
        r.push("e");
        return r;
    }
}
