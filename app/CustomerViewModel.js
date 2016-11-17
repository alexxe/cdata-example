"use strict";
const ViewModel_1 = require("../core/cdata/src/ViewModel");
const QNode_1 = require("../core/cdata/src/QNode");
class CustomerViewModel extends ViewModel_1.ViewModel {
    constructor(model) {
        super(model);
    }
    initFilterMap() {
        this.filterMap.set("firma", (value) => this.model.addFilter(x => x.customer.firma1, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("firma1", (value) => this.model.addFilter(x => x.customer.firma2, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("vorname", (value) => this.model.addFilter(x => x.firstName, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("nachname", (value) => this.model.addFilter(x => x.lastName, QNode_1.BinaryType.Contains, value));
    }
    sort(property) {
        // let customerModel = <CustomerModel>this.model;
        // if (property === "firma1") {
        //     customerModel.customerSort(x => x.firma1);
        // }
        // if (property === "firma2") {
        //     customerModel.customerSort(x => x.firma2);
        // }
        // if (property === "firstName") {
        //     customerModel.contactSort(x => x.firstName);
        // }
        // if (property === "lastName") {
        //     customerModel.contactSort(x => x.lastName);
        // }
    }
    isSortedByAscending(property) {
        return true;
    }
    isSortedByDescending(property) {
        return false;
    }
}
exports.CustomerViewModel = CustomerViewModel;
//# sourceMappingURL=CustomerViewModel.js.map