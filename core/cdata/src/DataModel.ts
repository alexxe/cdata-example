import {RequestOptions, Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
require('rxjs/add/operator/map');
import {QNode, NodeType} from "./QNode";
import {BinaryType} from "./QNode";
import {MethodType} from "./QNode";
import {QDescriptor} from "./QDescriptor";
import {Projection} from "./Projection";


export class DataModel<TP extends Projection> {
    constructor(private http: Http,private url:string) {
        this.includes = [];
        this.filters = [];

    }
    protected projection:QNode;
    private filters:Array<QNode>;
    private includes: string[];
    public data:TP[];


    addFilter(path: (x:TP) => any,op:BinaryType,value:any) {
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

    private buildFilter() :QNode {
        if(this.filters.length == 0) {
            return this.projection;
        }

        let where:QNode = {
            Type:NodeType.Method,
            Value:MethodType.Where,
            Left:this.projection
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
        return where;
    }

    refresh() {
        let filter = this.buildFilter();
        let descroiptor = new QDescriptor();
        descroiptor.Root = filter;
        this.getData(descroiptor);
        this.resetModel();
    }

    protected resetModel() {
        this.includes = [];
    }

    private getData(query: QDescriptor) {
        this.post(query).subscribe(
            res => {
                let mapped = [];
                res.forEach(d => mapped.push(d));
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


