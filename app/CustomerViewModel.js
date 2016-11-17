"use strict";
const ViewModel_1 = require("../core/cdata/src/ViewModel");
const QNode_1 = require("../core/cdata/src/QNode");
class CustomerViewModel extends ViewModel_1.ViewModel {
    constructor(model) {
        super(model);
    }
    initFilterMap() {
        this.filterMap.set("firma1", (value) => this.model.addFilter(x => x.firma, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("firma2", (value) => this.model.addFilter(x => x.firma1, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("firstName", (value) => this.model.addFilter(x => x.name, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("lastName", (value) => this.model.addFilter(x => x.nachname, QNode_1.BinaryType.Contains, value));
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