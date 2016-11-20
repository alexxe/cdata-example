import {Component, Input} from '@angular/core';
import {Http} from "@angular/http";
import {DemoViewModel} from "./DemoViewModel";
import {DemoModel} from "./model/DemoModel";
import {IProjection} from "../core/cdata/src/IProjection";


@Component({
  selector: 'my-app',
  templateUrl: './app/demo.component.html'

})
export class DemoComponent {
  public viewModel: DemoViewModel;


  constructor(private http: Http) {
    let dataModel = new DemoModel(http,"http://localhost/Example.WebApi/api/crm/contact");
    this.viewModel = new DemoViewModel(dataModel);
    this.viewModel.refresh();
  }







}
