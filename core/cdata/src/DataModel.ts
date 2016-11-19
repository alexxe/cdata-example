import {RequestOptions, Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
require('rxjs/add/operator/map');
import {QNode, NodeType} from "./QNode";
import {BinaryType} from "./QNode";
import {MethodType} from "./QNode";
import {QDescriptor} from "./QDescriptor";
import {IProjection} from "./IProjection";
import {IModelEntity} from "./IModelEntity";
import {IDataModel} from "./IDataModel";
import {DataRow} from "./DataRow";


export abstract class DataModel<TP extends IProjection,TM extends IModelEntity> implements IDataModel<TM> {
    private queryable: QNode;
    private projection: QNode;
    private filters: Array<QNode>;
    private includes: string[];
    private sortingNodes: Map<string,QNode>;

    constructor(private http: Http, private url: string, modelEntry: IModelEntity) {
        this.includes = [];
        this.filters = [];
        this.sortingNodes = new Map<string,QNode>();
        this.queryable = {
            Type: NodeType.Querable,
            Value: modelEntry.constructor.name
        };
        this.projection = this.configureProjection();
    }

    abstract configureProjection(): QNode;

    binding(p: ((x: TP)=> void), m: ((x: TM)=> void)): string {
        let property = this.convertLambdaToPath(p);
        let path = this.convertLambdaToPath(m);
        return property + ":" + path;
    }

    sort(property: string) : Observable<DataRow<TP>[]>{
        let sort: QNode;
        sort = {
            Type: NodeType.Method,
            Value: MethodType.OrderBy,
            Right: {
                Type: NodeType.Member,
                Value: property
            }
        }
        if (this.sortingNodes.has(property)) {
            let node = this.sortingNodes.get(property);
            if (node.Value == MethodType.OrderBy) {
                node.Value = MethodType.OrderByDescending;
            } else {
                this.sortingNodes.delete(property);
            }

        }
        else {
            this.sortingNodes.set(property, sort);
        }
        return this.refresh();
    }

    addFilter(path: (x: TM) => any, op: BinaryType, value: any) {
        let filter: QNode;
        filter = {
            Type: NodeType.Binary,
            Value: op,
            Left: {
                Type: NodeType.Member,
                Value: this.convertLambdaToPath(path)
            },
            Right: {
                Type: NodeType.Constant,
                Value: value
            }
        };
        this.filters.push(filter);
    }

    private buildQuery(): QNode {
        let root: QNode = null;
        if (this.filters.length > 0) {
            root = {
                Type: NodeType.Method,
                Value: MethodType.Where,
                Left: this.queryable
            };
            for (var i = 0; i < this.filters.length; i++) {
                let node = this.filters[i];
                if (i == 0) {
                    root.Right = node;
                }
                else {
                    let binary: QNode = {
                        Type: NodeType.Binary,
                        Value: BinaryType.And,
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

    refresh() : Observable<DataRow<TP>[]>{
        let root = this.buildQuery();
        let descroiptor = new QDescriptor();
        descroiptor.Root = root;
        this.resetModel();
        return this.post(descroiptor);


    }

    protected resetModel() {
        this.includes = [];
        this.filters = [];
    }

    private post(query: QDescriptor): Observable<DataRow<TP>[]> {
        let body = JSON.stringify(query);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.url, body, options)
            .map(res => <TP[]>res.json())
            .map(res => {
                let mapped:DataRow<TP>[] = [];
                res.forEach(d => mapped.push(new DataRow<TP>(d)));
                return mapped;

            });
    }

    protected convertLambdaToPath(lambda: any): string {
        let p = lambda.toString().split('.');
        var path;
        for (var i = 1; i < p.length; i++) {
            if (path === undefined) {
                path = p[i];
            } else {
                path = path + "." + p[i];
            }

        }
        return path.split(';')[0];
    }
}


