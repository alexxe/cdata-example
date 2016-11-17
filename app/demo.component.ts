import {Component, Input} from '@angular/core';
import {Http} from "@angular/http";
import {CustomerViewModel} from "./CustomerViewModel";
import {CustomerModel} from "./CustomerModel";
import {Projection} from "./../core/cdata/src/Projection";


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
    this.dataModel = new CustomerModel(http,"http://localhost/Example.WebApi/api/Model/Default");
    this.viewModel = new CustomerViewModel(this.dataModel);
    this.refresh();
  }

  public refresh() {
    this.viewModel.applyFilterState();
    this.dataModel.refresh();
  }





}
