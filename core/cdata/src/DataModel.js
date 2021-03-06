"use strict";
const http_1 = require("@angular/http");
require('rxjs/add/operator/map');
const QNode_1 = require("./QNode");
const QNode_2 = require("./QNode");
const QNode_3 = require("./QNode");
const QDescriptor_1 = require("./QDescriptor");
const DataRow_1 = require("./DataRow");
class DataModel {
    constructor(http, url) {
        this.http = http;
        this.url = url;
        this.includes = [];
        this.filters = [];
        this.sortingNodes = new Map();
        this.query = this.getQuery();
    }
    binding(p, m) {
        let property = this.convertLambdaToPath(p);
        let path = this.convertLambdaToPath(m);
        return property + ":" + path;
    }
    sort(property) {
        if (this.sortingNodes.has(property)) {
            let node = this.sortingNodes.get(property);
            if (node.Value == QNode_3.MethodType.OrderBy) {
                node.Value = QNode_3.MethodType.OrderByDescending;
            }
            else {
                this.sortingNodes.delete(property);
            }
        }
        else {
            this.sortingNodes.set(property, {
                Type: QNode_1.NodeType.Method,
                Value: QNode_3.MethodType.OrderBy,
                Right: {
                    Type: QNode_1.NodeType.Member,
                    Value: property
                }
            });
        }
        return this.refresh();
    }
    addFilter(path, op, value) {
        this.filters.push({
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
        });
    }
    buildQuery() {
        let root = this.query;
        if (this.filters.length > 0) {
            let where = {
                Type: QNode_1.NodeType.Method,
                Value: QNode_3.MethodType.Where,
                Left: this.query
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
            where.Left = root;
            root = where;
        }
        for (let node of this.sortingNodes.values()) {
            node.Left = root;
            root = node;
        }
        return root;
    }
    refresh() {
        let root = this.buildQuery();
        let descroiptor = new QDescriptor_1.QDescriptor();
        descroiptor.Root = root;
        this.resetModel();
        return this.post(descroiptor);
    }
    resetModel() {
        this.includes = [];
        this.filters = [];
    }
    post(query) {
        let body = JSON.stringify(query);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.url, body, options)
            .map(res => res.json())
            .map(res => {
            let mapped = [];
            res.forEach(d => mapped.push(new DataRow_1.DataRow(d)));
            return mapped;
        });
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