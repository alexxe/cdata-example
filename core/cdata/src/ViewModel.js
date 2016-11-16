"use strict";
class ViewModel {
    constructor(model) {
        this.model = model;
        this.filter = {};
        this.filterMap = new Map();
        this.initFilterMap();
    }
    applyFilterState() {
        let filters = Object.getOwnPropertyNames(this.filter);
        for (let i = 0; i < filters.length; i++) {
            let property = filters[i];
            let value = this.filter[property];
            let f = this.filterMap.get(property);
            f.call(this.model, value);
        }
    }
}
exports.ViewModel = ViewModel;
//# sourceMappingURL=ViewModel.js.map