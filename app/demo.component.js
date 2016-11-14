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
var CustomerDto_1 = require("./model/CustomerDto");
var CQueryDescriptor_1 = require("../core/cdata/src/CQueryDescriptor");
var CQuery_1 = require("../core/cdata/src/CQuery");
var DemoComponent = (function () {
    function DemoComponent(http) {
        this.http = http;
        this.url = "http://localhost/Example.WebApi/api/Model/Default";
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        this.dataTable = new DataTable_1.DataTable();
        /*http.get("app/data.json")
            .subscribe((data)=> {
              setTimeout(()=> {
    
                this.dataTable.data = data.json();
              }, 1000);
            });*/
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
    DemoComponent.prototype.search = function () {
        var _this = this;
        var viewFilter;
        viewFilter = {};
        viewFilter["firstName"] = "a";
        viewFilter["lastName"] = "l";
        viewFilter["firma1"] = "k";
        var filters = this.buildFilters(viewFilter);
        var query = new CQuery_1.CQuery(new CustomerDto_1.CustomerDto(), filters, null);
        this.getData(query.getDescriptor()).subscribe(function (data) {
            _this.dataTable.data = data;
        }, function (error) { return console.error(error); });
    };
    DemoComponent.prototype.buildQuery = function () {
    };
    DemoComponent.prototype.buildFilters = function (viewFilter) {
        var customerFilter = [];
        var contactFilter = [];
        var contactFilters = Object.getOwnPropertyNames(viewFilter);
        for (var i = 0; i < contactFilters.length; i++) {
            var property = contactFilters[i];
            var value = viewFilter[property];
            if (property === "firstName") {
                contactFilter.push({
                    firstName: {
                        operator: CQueryDescriptor_1.StringMethods.Contains,
                        value: value
                    }
                });
            }
            else if (property === "lastName") {
                contactFilter.push({
                    lastName: {
                        operator: CQueryDescriptor_1.StringMethods.Contains,
                        value: value
                    }
                });
            }
        }
        var customerFilters = Object.getOwnPropertyNames(viewFilter);
        for (var i = 0; i < customerFilters.length; i++) {
            var property = customerFilters[i];
            var value = viewFilter[property];
            if (property === "firma1") {
                customerFilter.push({
                    firma1: {
                        operator: CQueryDescriptor_1.StringMethods.Contains,
                        value: value
                    }
                });
            }
            else if (property === "firma2") {
                customerFilter.push({
                    firma2: {
                        operator: CQueryDescriptor_1.StringMethods.Contains,
                        value: value
                    }
                });
            }
        }
        if (contactFilters.length > 0) {
            customerFilter.push({
                contacts: {
                    method: CQueryDescriptor_1.Methods.Any,
                    value: contactFilter
                }
            });
        }
        return customerFilter;
    };
    DemoComponent.prototype.getData = function (query) {
        var _this = this;
        var body = JSON.stringify(query);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var post = this.http.post(this.url, body, options);
        var result = post.mergeMap(function (res) { return _this.dataTable.data = res.json(); });
        return result;
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