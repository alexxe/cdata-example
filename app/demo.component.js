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
var core_1 = require('@angular/core');
require('rxjs/add/observable/fromPromise');
require('rxjs/add/operator/mergeMap');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var http_1 = require("@angular/http");
var DataTable_1 = require("../core/table/src/DataTable");
var CustomerViewModel_1 = require("./CustomerViewModel");
var CustomerModel_1 = require("./model/CustomerModel");
var DemoComponent = (function () {
    function DemoComponent(http) {
        this.http = http;
        this.dataModel = new CustomerModel_1.CustomerModel(http, "http://localhost/Example.WebApi/api/Model/Default");
        this.viewModel = new CustomerViewModel_1.CustomerViewModel();
        this.refresh();
    }
    Object.defineProperty(DemoComponent.prototype, "data", {
        get: function () {
            return this.dataModel.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DemoComponent.prototype, "filter", {
        get: function () {
            return this.viewModel.filter;
        },
        enumerable: true,
        configurable: true
    });
    DemoComponent.prototype.refresh = function () {
        this.viewModel.setFilters(this.dataModel);
        this.dataModel.refresh();
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
            templateUrl: './app/demo.component.html',
            providers: [DataTable_1.DataTable]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DemoComponent);
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=demo.component.js.map