import {RequestOptions, Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
require('rxjs/add/operator/map');
import {IModel} from "./IModel";
import {CQueryDescriptor, CompareOperator, StringMethods} from "./CQueryDescriptor";
import {IFilterDescriptor, CQuery} from "./CQuery";
import {ViewModel} from "./ViewModel";


export abstract class DataModel<TM extends IModel,TD extends IFilterDescriptor> {
    constructor(private http: Http,private url:string,private model:TM) {
        this.filterDescriptors = [];
        this.includes = [];
    }
    protected filterDescriptors: TD[];
    private includes: string[];
    public data:TM[];


    abstract applyFilters();

    refresh() {
        this.applyFilters();
        let query = new CQuery<TD>(this.model, this.filterDescriptors,null,this.includes);
        this.getData(query.getDescriptor());
        this.resetModel();
    }

    protected resetModel() {
        this.filterDescriptors = [];
        this.includes = [];
    }

    protected addInclude(f: (x:TM) => any) {
        this.includes.push(this.convertLambdaToPath(f.toString()));
    }

    public addFilter(path: (x:TM) => any,op:CompareOperator | StringMethods,value:any) {

    }

    private getData(query: CQueryDescriptor) {
        this.post(query).subscribe(
            res => {
                let mapped = [];
                res.forEach(d => mapped.push(d));
                this.data = mapped;
            });
    }

    private post(query: CQueryDescriptor) : Observable<TM[]> {
        let body = JSON.stringify(query);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.url, body, options).
        map(res => <TM[]>res.json());
    }

    private convertLambdaToPath(lambda:string) : string {
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


