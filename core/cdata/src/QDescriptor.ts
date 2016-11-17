import {QNode} from "./QNode";
/**
 * Created by dle on 17.11.2016.
 */

export class QDescriptor {
    constructor() {
        this.Include = [];
    }

    Root: QNode;
    Include: Array<QNode>;
}