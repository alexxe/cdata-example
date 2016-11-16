import {RequestOptions, Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
require('rxjs/add/operator/map');
import {IModel} from "./IModel";
import {CQueryDescriptor, CompareOperator, StringMethods} from "./CQueryDescriptor";
import {IFilterDescriptor, CQuery} from "./CQuery";
import {ViewModel} from "./ViewModel";
import {DescriptorVisitor} from "./DescriptorVisitor";
import {QNode, NodeType} from "./QNode";


export abstract class DataModel<TM extends IModel,TD extends IFilterDescriptor> {
    constructor(private http: Http,private url:string,private model:TM) {
        this.filterDescriptors = [];
        this.includes = [];
        this.queryable = {
            Type:NodeType.Querable,
            Value:model.constructor.name
        };
    }
    protected queryable:QNode;
    protected filterDescriptors: TD[];
    private includes: string[];
    public data:TM[];


    abstract applyFilters() : QNode;


    refresh() {
        let query = this.applyFilters();
        this.getData(query);
        this.resetModel();
    }

    protected resetModel() {
        this.filterDescriptors = [];
        this.includes = [];
    }

    protected addInclude(f: (x:TM) => any) {
        this.includes.push(this.convertLambdaToPath(f.toString()));
    }



    private getData(query: QNode) {
        this.post(query).subscribe(
            res => {
                let mapped = [];
                res.forEach(d => mapped.push(d));
                this.data = mapped;
            });
    }

    private post(query: QNode) : Observable<TM[]> {
        let body = JSON.stringify(query);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.url, body, options).
        map(res => <TM[]>res.json());
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


