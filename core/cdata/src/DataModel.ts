import {RequestOptions, Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
require('rxjs/add/operator/map');
import {IModel} from "./IModel";
import {CQueryDescriptor} from "./CQueryDescriptor";
import {IFilterDescriptor, CQuery} from "./CQuery";
import {ViewModel} from "./ViewModel";


export abstract class DataModel<TM extends IModel,TD extends IFilterDescriptor> {
    constructor(private http: Http,private url:string,private model:TM) {
        this.filterDescriptors = [];
    }
    public filterDescriptors: TD[];
    public data:TM[];

    abstract applyFilters();

    refresh() {
        this.applyFilters();
        let query = new CQuery<TD>(this.model, this.filterDescriptors,null);
        this.getData(query.getDescriptor());
        this.filterDescriptors = [];
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
}


