"use strict";
const http_1 = require("@angular/http");
require('rxjs/add/operator/map');
const QNode_1 = require("./QNode");
const QNode_2 = require("./QNode");
const QNode_3 = require("./QNode");
const QDescriptor_1 = require("./QDescriptor");
class DataModel {
    constructor(http, url) {
        this.http = http;
        this.url = url;
        this.includes = [];
        this.filters = [];
    }
    addFilter(path, op, value) {
        let filter;
        filter = {
            Type: QNode_1.NodeType.Binary,
            Value: op,
            Left: {
                Type: QNode_1.NodeType.Member,
                Value: this.convertLambdaToPath(path)
            },
            Right: {
                Type: QNode_1.NodeType.Constant,
                Value: value
            }
        };
        this.filters.push(filter);
    }
    buildFilter() {
        if (this.filters.length == 0) {
            return this.projection;
        }
        let where = {
            Type: QNode_1.NodeType.Method,
            Value: QNode_3.MethodType.Where,
            Left: this.projection
        };
        for (var i = 0; i < this.filters.length; i++) {
            let node = this.filters[i];
            if (i == 0) {
                where.Right = node;
            }
            else {
                let binary = {
                    Type: QNode_1.NodeType.Binary,
                    Value: QNode_2.BinaryType.And,
                    Left: where.Right,
                    Right: node
                };
                where.Right = binary;
            }
        }
        return where;
    }
    refresh() {
        let filter = this.buildFilter();
        let descroiptor = new QDescriptor_1.QDescriptor();
        descroiptor.Root = filter;
        this.getData(descroiptor);
        this.resetModel();
    }
    resetModel() {
        this.includes = [];
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