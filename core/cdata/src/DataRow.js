"use strict";
/**
 * Created by user on 11/17/2016.
 */
class DataRow {
    constructor(source) {
        this.source = source;
        this.values = [];
        this.properties = [];
        let properties = Object.getOwnPropertyNames(this.source);
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = this.source[property];
            this.values.push(value);
            this.properties.push(property);
        }
    }
}
exports.DataRow = DataRow;
//# sourceMappingURL=DataRow.js.map