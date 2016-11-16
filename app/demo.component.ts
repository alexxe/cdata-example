import {Component, Input} from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Http} from "@angular/http";
import {CustomerViewModel} from "./CustomerViewModel";
import {CustomerModel} from "./CustomerModel";


@Component({
  selector: 'my-app',
  templateUrl: './app/demo.component.html'

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
    this.dataModel = new CustomerModel(http,"http://localhost/Example.WebApi/api/Test/Default");
    this.viewModel = new CustomerViewModel(this.dataModel);
    this.refresh();
  }

  public refresh() {
    this.viewModel.applyFilterState();
    this.dataModel.refresh();
  }





}
