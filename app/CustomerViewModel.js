"use strict";
const ViewModel_1 = require("../core/cdata/src/ViewModel");
const QNode_1 = require("../core/cdata/src/QNode");
class CustomerViewModel extends ViewModel_1.ViewModel {
    constructor(model) {
        super(model);
    }
    initFilterMap() {
        this.filterMap.set("firma", (value) => this.model.addFilter(x => x.customer.firma11, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("firma1", (value) => this.model.addFilter(x => x.customer.firma21, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("vorname", (value) => this.model.addFilter(x => x.firstName, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("nachname", (value) => this.model.addFilter(x => x.lastName, QNode_1.BinaryType.Contains, value));
    }
}
exports.CustomerViewModel = CustomerViewModel;
//# sourceMappingURL=CustomerViewModel.js.map