import {Component, Input} from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http} from "@angular/http";
import {DataTable} from "../core/table/src/DataTable";
import {CustomerDto} from "./model/CustomerDto";
import {ICustomerDtoDescriptor} from "./model/ICustomerDtoDescriptor";
import {CQuery} from "../core/cdata/src/CQuery";
import {CustomerViewModel} from "./CustomerViewModel";
import {DataModel} from "../core/cdata/src/DataModel";
import {CustomerModel} from "./model/CustomerModel";


@Component({
  selector: 'my-app',
  templateUrl: './app/demo.component.html',
  providers:[DataTable]

})
export class DemoComponent {
  public dataModel: CustomerModel;
  public viewModel: CustomerViewModel;

  @Input()
  get data() {
    return this.dataModel.data;
  }

  @Input()
  get filter() {
    return this.viewModel.filter;
  }

  constructor(private http: Http) {
    this.dataModel = new CustomerModel(http,"http://localhost/Example.WebApi/api/Model/Default");
    this.viewModel = new CustomerViewModel();
    this.refresh();
  }

  public refresh() {
    this.viewModel.setFilters(this.dataModel);
    this.dataModel.refresh();
  }





}
