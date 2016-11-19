import {Component, Input} from '@angular/core';
import {Http} from "@angular/http";
import {CustomerViewModel} from "./CustomerViewModel";
import {CustomerModel} from "./CustomerModel";
import {IProjection} from "../core/cdata/src/IProjection";


@Component({
  selector: 'my-app',
  templateUrl: './app/demo.component.html'

})
export class DemoComponent {
  public viewModel: CustomerViewModel;


  constructor(private http: Http) {
    let dataModel = new CustomerModel(http,"http://localhost/Example.WebApi/api/Model/Default");
    this.viewModel = new CustomerViewModel(dataModel);
    this.viewModel.refresh();
  }







}
