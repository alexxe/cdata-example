"use strict";
class ViewModel {
    constructor(model) {
        this.model = model;
        this.filter = {};
        this.filterMap = new Map();
    }
    applyFilterState() {
        let filters = Object.getOwnPropertyNames(this.filter);
        for (let i = 0; i < filters.length; i++) {
            let property = filters[i];
            let value = this.filter[property];
            this.addFilter(property, value);
        }
    }
}
exports.ViewModel = ViewModel;
//# sourceMappingURL=ViewModel.js.map