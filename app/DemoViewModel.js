"use strict";
const ViewModel_1 = require("../core/cdata/src/ViewModel");
const QNode_1 = require("../core/cdata/src/QNode");
class DemoViewModel extends ViewModel_1.ViewModel {
    constructor(model) {
        super(model);
    }
    configureFilterMap() {
        let map = new Map();
        map.set("firma", (value) => this.model.addFilter(x => x.firma, QNode_1.BinaryType.Contains, value));
        map.set("firma1", (value) => this.model.addFilter(x => x.firma1, QNode_1.BinaryType.Contains, value));
        map.set("vorname", (value) => this.model.addFilter(x => x.name, QNode_1.BinaryType.Contains, value));
        map.set("nachname", (value) => this.model.addFilter(x => x.nachname, QNode_1.BinaryType.Contains, value));
        return map;
    }
}
exports.DemoViewModel = DemoViewModel;
//# sourceMappingURL=DemoViewModel.js.map