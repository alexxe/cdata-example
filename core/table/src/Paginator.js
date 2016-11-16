"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
const core_1 = require("@angular/core");
const DataTable_1 = require("./DataTable");
let Paginator = class Paginator {
    constructor(injectMfTable) {
        this.injectMfTable = injectMfTable;
        this.dataLength = 0;
        this.onPageChangeSubscriber = (event) => {
            this.activePage = event.activePage;
            this.rowsOnPage = event.rowsOnPage;
            this.dataLength = event.dataLength;
            this.lastPage = Math.ceil(this.dataLength / this.rowsOnPage);
        };
    }
    ngOnChanges(changes) {
        this.mfTable = this.inputMfTable || this.injectMfTable;
        this.onPageChangeSubscriber(this.mfTable.getPage());
        this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
    }
    setPage(pageNumber) {
        this.mfTable.setPage(pageNumber, this.rowsOnPage);
    }
    setRowsOnPage(rowsOnPage) {
        this.mfTable.setPage(this.activePage, rowsOnPage);
    }
};
__decorate([
    core_1.Input("mfTable"), 
    __metadata('design:type', DataTable_1.DataTable)
], Paginator.prototype, "inputMfTable", void 0);
Paginator = __decorate([
    core_1.Component({
        selector: "mfPaginator",
        template: `<ng-content></ng-content>`
    }),
    __param(0, core_1.Optional()), 
    __metadata('design:paramtypes', [DataTable_1.DataTable])
], Paginator);
exports.Paginator = Paginator;
//# sourceMappingURL=Paginator.js.map