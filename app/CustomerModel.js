"use strict";
const DataModel_1 = require("../core/cdata/src/DataModel");
const CustomerDto_1 = require("./model/CustomerDto");
const QNode_1 = require("../core/cdata/src/QNode");
class CustomerModel extends DataModel_1.DataModel {
    constructor(http, url) {
        super(http, url, new CustomerDto_1.CustomerDto());
        this.customerFilters = [];
        this.contactFilters = [];
    }
    applyFilters() {
        if (this.customerFilters.length == 0) {
            return this.queryable;
        }
        let where = {
            Type: QNode_1.NodeType.Method,
            Value: QNode_1.MethodType.Where,
            Left: this.queryable
        };
        for (var i = 0; i < this.customerFilters.length; i++) {
            let node = this.customerFilters[i];
            if (i == 0) {
                where.Right = node;
            }
            else {
                let binary = {
                    Type: QNode_1.NodeType.Binary,
                    Value: QNode_1.BinaryType.And,
                    Left: where.Right,
                    Right: node
                };
                where.Right = binary;
            }
        }
        return where;
    }
    customerSort(path) {
    }
    contactSort(path) {
    }
    addCustomerFilter(path, op, value) {
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
        this.customerFilters.push(filter);
    }
    addContactFilter(path, op, value) {
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
        this.contactFilters.push(filter);
    }
    resetModel() {
        this.customerFilters = [];
        this.contactFilters = [];
        super.resetModel();
    }
}
exports.CustomerModel = CustomerModel;
//# sourceMappingURL=CustomerModel.js.map