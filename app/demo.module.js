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
const forms_1 = require('@angular/forms');
const platform_browser_1 = require('@angular/platform-browser');
const common_1 = require('@angular/common');
const http_1 = require('@angular/http');
const demo_component_1 = require('./demo.component');
const table_1 = require("./../core/table");
let DemoModule = class DemoModule {
};
DemoModule = __decorate([
    core_1.NgModule({
        declarations: [
            demo_component_1.DemoComponent
        ],
        imports: [
            table_1.DataTableModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            common_1.CommonModule,
            http_1.HttpModule,
            http_1.JsonpModule
        ],
        providers: [],
        bootstrap: [demo_component_1.DemoComponent]
    }), 
    __metadata('design:paramtypes', [])
], DemoModule);
exports.DemoModule = DemoModule;
//# sourceMappingURL=demo.module.js.map