"use strict";
const http_1 = require("@angular/http");
require('rxjs/add/operator/map');
const QNode_1 = require("./QNode");
const QNode_2 = require("./QNode");
const QNode_3 = require("./QNode");
const QDescriptor_1 = require("./QDescriptor");
const DataRow_1 = require("./DataRow");
class DataModel {
    constructor(http, url, modelEntry) {
        this.http = http;
        this.url = url;
        this.includes = [];
        this.filters = [];
        this.sortingNodes = new Map();
        this.queryable = {
            Type: QNode_1.NodeType.Querable,
            Value: modelEntry.constructor.name
        };
        this.initProjection();
    }
    binding(p, m) {
        let property = this.convertLambdaToPath(p);
        let path = this.convertLambdaToPath(m);
        return property + ":" + path;
    }
    sort(property) {
        let sort;
        sort = {
            Type: QNode_1.NodeType.Method,
            Value: QNode_3.MethodType.OrderBy,
            Right: {
                Type: QNode_1.NodeType.Member,
                Value: property
            }
        };
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
            this.sortingNodes.set(property, sort);
        }
        return this.refresh();
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
    buildQuery() {
        let root = null;
        if (this.filters.length > 0) {
            root = {
                Type: QNode_1.NodeType.Method,
                Value: QNode_3.MethodType.Where,
                Left: this.queryable
            };
            for (var i = 0; i < this.filters.length; i++) {
                let node = this.filters[i];
                if (i == 0) {
                    root.Right = node;
                }
                else {
                    let binary = {
                        Type: QNode_1.NodeType.Binary,
                        Value: QNode_2.BinaryType.And,
                        Left: root.Right,
                        Right: node
                    };
                    root.Right = binary;
                }
            }
        }
        if (root == null) {
            this.projection.Left = this.queryable;
        }
        else {
            this.projection.Left = root;
        }
        root = this.projection;
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