"use strict";
const http_1 = require("@angular/http");
require('rxjs/add/operator/map');
const QNode_1 = require("./QNode");
class DataModel {
    constructor(http, url, model) {
        this.http = http;
        this.url = url;
        this.model = model;
        this.filterDescriptors = [];
        this.includes = [];
        this.queryable = {
            Type: QNode_1.NodeType.Querable,
            Value: model.constructor.name
        };
    }
    refresh() {
        let query = this.applyFilters();
        this.getData(query);
        this.resetModel();
    }
    resetModel() {
        this.filterDescriptors = [];
        this.includes = [];
    }
    addInclude(f) {
        this.includes.push(this.convertLambdaToPath(f.toString()));
    }
    getData(query) {
        this.post(query).subscribe(res => {
            let mapped = [];
            res.forEach(d => mapped.push(d));
            this.data = mapped;
        });
    }
    post(query) {
        let body = JSON.stringify(query);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url, body, options).
            map(res => res.json());
    }
    convertLambdaToPath(lambda) {
        let p = lambda.toString().split('.');
        var path;
        for (var i = 1; i < p.length; i++) {
            if (path === undefined) {
                path = p[i];
            }
            else {
                path = path + "." + p[i];
            }
        }
        return path.split(';')[0];
    }
}
exports.DataModel = DataModel;
//# sourceMappingURL=DataModel.js.map