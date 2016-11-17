"use strict";
const Projection_1 = require("../../core/cdata/src/Projection");
class CustomerProjection extends Projection_1.Projection {
    values() {
        let values = [];
        let properties = Object.getOwnPropertyNames(this);
        for (let i = 0; i < properties.length; i++) {
            let property = properties[i];
            let value = this[property];
            values.push(value);
        }
        return values;
    }
    test() {
        let r = [];
        r.push("w");
        r.push("e");
        return r;
    }
}
exports.CustomerProjection = CustomerProjection;
//# sourceMappingURL=CustomerProjection.js.map