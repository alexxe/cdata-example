"use strict";
const DataModel_1 = require("../core/cdata/src/DataModel");
const QNode_1 = require("../core/cdata/src/QNode");
const ContactDto_1 = require("./model/generated/ContactDto");
class CustomerModel extends DataModel_1.DataModel {
    constructor(http, url) {
        super(http, url, new ContactDto_1.ContactDto());
    }
    initProjection() {
        this.projection = {
            Type: QNode_1.NodeType.Method,
            Value: QNode_1.MethodType.Select,
            Right: {
                Type: QNode_1.NodeType.Member,
                Value: this.binding(x => x.name, x => x.firstName),
                Left: {
                    Type: QNode_1.NodeType.Member,
                    Value: this.binding(x => x.nachname, x => x.lastName),
                    Left: {
                        Type: QNode_1.NodeType.Member,
                        Value: this.binding(x => x.firma, x => x.customer.firma11),
                        Left: {
                            Type: QNode_1.NodeType.Member,
                            Value: this.binding(x => x.firma1, x => x.customer.firma21)
                        }
                    }
                }
            }
        };
    }
}
exports.CustomerModel = CustomerModel;
//# sourceMappingURL=CustomerModel.js.map