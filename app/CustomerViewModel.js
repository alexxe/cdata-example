"use strict";
const ViewModel_1 = require("../core/cdata/src/ViewModel");
const QNode_1 = require("../core/cdata/src/QNode");
class CustomerViewModel extends ViewModel_1.ViewModel {
    constructor(model) {
        super(model);
    }
    initFilterMap() {
        let customerModel = this.model;
        this.filterMap.set("firma1", (value) => customerModel.addCustomerFilter(x => x.firma1, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("firma2", (value) => customerModel.addCustomerFilter(x => x.firma2, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("firstName", (value) => customerModel.addContactFilter(x => x.firstName, QNode_1.BinaryType.Contains, value));
        this.filterMap.set("lastName", (value) => customerModel.addContactFilter(x => x.lastName, QNode_1.BinaryType.Contains, value));
    }
    sort(property) {
        let customerModel = this.model;
        if (property === "firma1") {
            customerModel.customerSort(x => x.firma1);
        }
        if (property === "firma2") {
            customerModel.customerSort(x => x.firma2);
        }
        if (property === "firstName") {
            customerModel.contactSort(x => x.firstName);
        }
        if (property === "lastName") {
            customerModel.contactSort(x => x.lastName);
        }
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