"use strict";
class ViewModel {
    constructor(model) {
        this.model = model;
        this.filter = {};
        this.sorting = [];
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
    isSortedByAscending(property) {
        return true;
    }
    isSortedByDescending(property) {
        return false;
    }
    sort(property) {
        this.applyFilterState();
        this.model.sort(property).subscribe(data => {
            this.data = data;
        });
    }
    refresh() {
        this.applyFilterState();
        this.model.refresh().subscribe(data => {
            this.data = data;
            if (this.sorting.length == 0) {
                this.sorting = data[0].properties;
            }
        });
    }
}
exports.ViewModel = ViewModel;
//# sourceMappingURL=ViewModel.js.map