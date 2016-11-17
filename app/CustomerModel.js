"use strict";
const DataModel_1 = require("../core/cdata/src/DataModel");
const QNode_1 = require("../core/cdata/src/QNode");
const ContactDto_1 = require("./model/ContactDto");
class CustomerModel extends DataModel_1.DataModel {
    constructor(http, url) {
        super(http, url);
        let queryable = {
            Type: QNode_1.NodeType.Querable,
            Value: new ContactDto_1.ContactDto().constructor.name
        };
        this.projection = {
            Type: QNode_1.NodeType.Method,
            Value: QNode_1.MethodType.Select,
            Left: queryable,
            Right: {
                Type: QNode_1.NodeType.Member,
                Value: "name:firstName",
                Left: {
                    Type: QNode_1.NodeType.Member,
                    Value: "nachname:lastName",
                    Left: {
                        Type: QNode_1.NodeType.Member,
                        Value: "firma:customer.firma1",
                        Left: {
                            Type: QNode_1.NodeType.Member,
                            Value: "firma1:customer.firma2"
                        }
                    }
                }
            }
        };
    }
    resetModel() {
        super.resetModel();
    }
}
exports.CustomerModel = CustomerModel;
//# sourceMappingURL=CustomerModel.js.map