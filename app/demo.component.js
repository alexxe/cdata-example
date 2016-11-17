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
const core_1 = require('@angular/core');
const http_1 = require("@angular/http");
const CustomerViewModel_1 = require("./CustomerViewModel");
const CustomerModel_1 = require("./CustomerModel");
let DemoComponent = class DemoComponent {
    constructor(http) {
        this.http = http;
        this.dataModel = new CustomerModel_1.CustomerModel(http, "http://localhost/Example.WebApi/api/Model/Default");
        this.viewModel = new CustomerViewModel_1.CustomerViewModel(this.dataModel);
        this.refresh();
    }
    get data() {
        return this.dataModel.data;
    }
    get filter() {
        return this.viewModel.filter;
    }
    refresh() {
        this.viewModel.applyFilterState();
        this.dataModel.refresh();
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], DemoComponent.prototype, "data", null);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], DemoComponent.prototype, "filter", null);
DemoComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app/demo.component.html'
    }), 
    __metadata('design:paramtypes', [http_1.Http])
], DemoComponent);
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=demo.component.js.map