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
var http_1 = require("@angular/http");
var DataTable_1 = require("../core/src/DataTable");
var DemoComponent = (function () {
    function DemoComponent(http) {
        var _this = this;
        this.http = http;
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        this.dataTable = new DataTable_1.DataTable();
        http.get("app/data.json")
            .subscribe(function (data) {
            setTimeout(function () {
                _this.dataTable.data = data.json();
            }, 1000);
        });
    }
    Object.defineProperty(DemoComponent.prototype, "data", {
        get: function () {
            return this.dataTable.data;
        },
        enumerable: true,
        configurable: true
    });
    DemoComponent.prototype.removeItem = function (item) {
        //this.data = _.filter(this.data, (elem)=>elem != item);
        console.log("Remove: ", item.email);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DemoComponent.prototype, "data", null);
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