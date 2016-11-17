import {RequestOptions, Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
require('rxjs/add/operator/map');
import {QNode, NodeType} from "./QNode";
import {BinaryType} from "./QNode";
import {MethodType} from "./QNode";
import {QDescriptor} from "./QDescriptor";
import {Projection} from "./Projection";
import {IModelEntity} from "./IModelEntity";
import {IDataModel} from "./IDataModel";
import {DataRow} from "./DataRow";


export class DataModel<TP extends Projection,TM extends IModelEntity> implements IDataModel<TM>{
    constructor(private http: Http,private url:string,modelEntry:IModelEntity) {
        this.includes = [];
        this.filters = [];
        this.sorting = [];
        this.queryable = {
            Type:NodeType.Querable,
            Value:modelEntry.constructor.name
        };

    }
    private queryable:QNode;
    protected projection:QNode;
    private filters:Array<QNode>;
    private includes: string[];
    public data:TP[];
    public sorting:string[];

    binding(p:((x:TP)=> void),m:((x:TM)=> void)):string {
        let property = this.convertLambdaToPath(p);
        let path = this.convertLambdaToPath(m);
        return property + ":" + path;
    }

    addFilter(path: (x:TM) => any,op:BinaryType,value:any) {
        let filter:QNode;
        filter = {
            Type:NodeType.Binary ,
            Value: op,
            Left:{
                Type:NodeType.Member,
                Value:this.convertLambdaToPath(path)
            },
            Right:{
                Type:NodeType.Constant,
                Value:value
            }
        };
        this.filters.push(filter);
    }

    private buildQuery() :QNode {
        if(this.filters.length == 0) {
            this.projection.Left = this.queryable;
            return this.projection;
        }

        let where:QNode = {
            Type:NodeType.Method,
            Value:MethodType.Where,
            Left:this.queryable
        };

        for(var i = 0; i < this.filters.length; i++) {
            let node = this.filters[i];
            if(i == 0){
                where.Right = node;
            }
            else {
                let binary:QNode = {
                    Type: NodeType.Binary,
                    Value:BinaryType.And,
                    Left:where.Right,
                    Right:node
                };
                where.Right = binary;
            }

        }

        this.projection.Left = where;
        return this.projection;
    }

    refresh() {
        let root = this.buildQuery();
        let descroiptor = new QDescriptor();
        descroiptor.Root = root;
        this.getData(descroiptor);
        this.resetModel();
    }

    protected resetModel() {
        this.includes = [];
        this.filters = [];
    }

    private getData(query: QDescriptor) {
        this.post(query).subscribe(
            res => {
                let mapped = [];
                res.forEach(d => mapped.push(new DataRow<TP>(d)));
                if(this.sorting.length == 0){
                    this.sorting = mapped[0].properties;
                }
                this.data = mapped;
            });
    }

    private post(query: QDescriptor) : Observable<TP[]> {
        let body = JSON.stringify(query);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.url, body, options).
        map(res => <TP[]>res.json());
    }

    protected convertLambdaToPath(lambda:any) : string {
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


