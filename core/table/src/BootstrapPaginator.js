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
const core_1 = require("@angular/core");
const DataTable_1 = require("./DataTable");
const _ = require("lodash");
let BootstrapPaginator = class BootstrapPaginator {
    constructor() {
        this.rowsOnPageSet = [];
        this.minRowsOnPage = 0;
    }
    ngOnChanges(changes) {
        if (changes.rowsOnPageSet) {
            this.minRowsOnPage = _.min(this.rowsOnPageSet);
        }
    }
};
__decorate([
    core_1.Input("rowsOnPageSet"), 
    __metadata('design:type', Object)
], BootstrapPaginator.prototype, "rowsOnPageSet", void 0);
__decorate([
    core_1.Input("mfTable"), 
    __metadata('design:type', DataTable_1.DataTable)
], BootstrapPaginator.prototype, "mfTable", void 0);
BootstrapPaginator = __decorate([
    core_1.Component({
        selector: "mfBootstrapPaginator",
        template: `
    <mfPaginator #p [mfTable]="mfTable">
        <nav class="pagination" *ngIf="p.dataLength > p.rowsOnPage">
            <li [class.disabled]="p.activePage <= 1" (click)="p.setPage(1)">
                <a style="cursor: pointer">&laquo;</a>
            </li>
            <li *ngIf="p.activePage > 4 && p.activePage + 1 > p.lastPage" (click)="p.setPage(p.activePage - 4)">
                <a style="cursor: pointer">{{p.activePage-4}}</a>
            </li>
            <li *ngIf="p.activePage > 3 && p.activePage + 2 > p.lastPage" (click)="p.setPage(p.activePage - 3)">
                <a style="cursor: pointer">{{p.activePage-3}}</a>
            </li>
            <li *ngIf="p.activePage > 2" (click)="p.setPage(p.activePage - 2)">
                <a style="cursor: pointer">{{p.activePage-2}}</a>
            </li>
            <li *ngIf="p.activePage > 1" (click)="p.setPage(p.activePage - 1)">
                <a style="cursor: pointer">{{p.activePage-1}}</a>
            </li>
            <li class="active">
                <a style="cursor: pointer">{{p.activePage}}</a>
            </li>
            <li *ngIf="p.activePage + 1 <= p.lastPage" (click)="p.setPage(p.activePage + 1)">
                <a style="cursor: pointer">{{p.activePage+1}}</a>
            </li>
            <li *ngIf="p.activePage + 2 <= p.lastPage" (click)="p.setPage(p.activePage + 2)">
                <a style="cursor: pointer">{{p.activePage+2}}</a>
            </li>
            <li *ngIf="p.activePage + 3 <= p.lastPage && p.activePage < 3" (click)="p.setPage(p.activePage + 3)">
                <a style="cursor: pointer">{{p.activePage+3}}</a>
            </li>
            <li *ngIf="p.activePage + 4 <= p.lastPage && p.activePage < 2" (click)="p.setPage(p.activePage + 4)">
                <a style="cursor: pointer">{{p.activePage+4}}</a>
            </li>
            <li [class.disabled]="p.activePage >= p.lastPage" (click)="p.setPage(p.lastPage)">
                <a style="cursor: pointer">&raquo;</a>
            </li>
        </nav>
        <nav class="pagination pull-right" *ngIf="p.dataLength > minRowsOnPage">
            <li *ngFor="let rows of rowsOnPageSet" [class.active]="p.rowsOnPage===rows" (click)="p.setRowsOnPage(rows)">
                <a style="cursor: pointer">{{rows}}</a>
            </li>
        </nav>
    </mfPaginator>
    `
    }), 
    __metadata('design:paramtypes', [])
], BootstrapPaginator);
exports.BootstrapPaginator = BootstrapPaginator;
//# sourceMappingURL=BootstrapPaginator.js.map