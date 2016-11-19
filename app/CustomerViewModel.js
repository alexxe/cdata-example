"use strict";
const ViewModel_1 = require("../core/cdata/src/ViewModel");
const QNode_1 = require("../core/cdata/src/QNode");
class CustomerViewModel extends ViewModel_1.ViewModel {
    constructor(model) {
        super(model);
    }
    configureFilterMap() {
        let map = new Map();
        map.set("firma", (value) => this.model.addFilter(x => x.customer.firma11, QNode_1.BinaryType.Contains, value));
        map.set("firma1", (value) => this.model.addFilter(x => x.customer.firma21, QNode_1.BinaryType.Contains, value));
        map.set("vorname", (value) => this.model.addFilter(x => x.firstName, QNode_1.BinaryType.Contains, value));
        map.set("nachname", (value) => this.model.addFilter(x => x.lastName, QNode_1.BinaryType.Contains, value));
        return map;
    }
}
exports.CustomerViewModel = CustomerViewModel;
//# sourceMappingURL=CustomerViewModel.js.map