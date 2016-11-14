import {Component, Input} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http, Headers, RequestOptions} from "@angular/http";
import {DataTable} from "../core/table/src/DataTable";
import {CustomerDto} from "./model/CustomerDto";
import {ICustomerDtoDescriptor} from "./model/ICustomerDtoDescriptor";
import {CompareOperator, StringMethods, Methods} from "../core/cdata/src/CQueryDescriptor";
import {IContactDtoDescriptor} from "./model/IContactDtoDescriptor";
import {CQuery} from "../core/cdata/src/CQuery";


@Component({
  selector: 'my-app',
  templateUrl: './app/demo.component.html',
  providers:[DataTable]

})
export class DemoComponent {
  private url:string = "http://localhost/Example.WebApi/api/Model/Default";
  public dataTable: DataTable<CustomerDto>;

  @Input()
  get data() {
    return this.dataTable.data;
  }
  constructor(private http: Http) {
    this.dataTable = new DataTable<CustomerDto>();
    this.dataTable.data = [];

    // http.get("app/data.json")
    //     .subscribe((data)=> {
    //       setTimeout(()=> {
    //
    //         this.dataTable.data = data.json();
    //       }, 1000);
    //     });
  }

  private sortByWordLength = (a: any) => {
    return a.name.length;
  }

  public removeItem(item: any) {
    //this.data = _.filter(this.data, (elem)=>elem != item);
    console.log("Remove: ", item.email);
  }

  public search() {
    let viewFilter: any;
    viewFilter = {};
    viewFilter["firstName"] = "a";
    viewFilter["lastName"] = "l";
    viewFilter["firma1"] = "k";

    let filters = this.buildFilters(viewFilter);
    let query = new CQuery<ICustomerDtoDescriptor>(new CustomerDto(), filters,null);

    this.getData(query.getDescriptor()).subscribe(
        data => {
          this.dataTable.data = data;

        }
        ,
        error => console.error(error));

  }

  private buildQuery() {


  }

  private buildFilters(viewFilter: any): ICustomerDtoDescriptor[] {
    let customerFilter: ICustomerDtoDescriptor[] = [];
    let contactFilter: IContactDtoDescriptor[] = [];

    let contactFilters = Object.getOwnPropertyNames(viewFilter);
    for (let i = 0; i < contactFilters.length; i++) {
      let property = contactFilters[i];
      let value = viewFilter[property];
      if (property === "firstName") {
        contactFilter.push({
          firstName: {
            operator: StringMethods.Contains,
            value: value
          }
        });
      } else if (property === "lastName") {
        contactFilter.push({
          lastName: {
            operator: StringMethods.Contains,
            value: value
          }
        });

      }
    }

    let customerFilters = Object.getOwnPropertyNames(viewFilter);
    for (let i = 0; i < customerFilters.length; i++) {
      let property = customerFilters[i];
      let value = viewFilter[property];
      if (property === "firma1") {
        customerFilter.push({
          firma1: {
            operator: StringMethods.Contains,
            value: value
          }
        });
      } else if (property === "firma2") {
        customerFilter.push({
          firma2: {
            operator: StringMethods.Contains,
            value: value
          }
        });
      }
    }

    if (contactFilters.length > 0) {
      customerFilter.push({
          contacts: {
            method: Methods.Any,
            value:contactFilter
          }
        });
    }


    return customerFilter;
  }

  getData(query: any): Observable<CustomerDto[]> {
    let body = JSON.stringify(query);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let post = this.http.post(this.url, body, options);
    let result = post.mergeMap(
        (res) => {
          let data = res.json().data || [];
          data.forEach((d) => {
            d.timestamp = new Date(d.timestamp);
          });
          return data;
        }
    );
    return result;
  }
}
