import {Component, Input} from '@angular/core';
import {Http} from "@angular/http";
import * as _ from "lodash";
import {IContact} from "./model/IContact";
import {DataTable} from "../core/src/DataTable";
import {ICustomer} from "./model/ICustomer";


@Component({
  selector: 'my-app',
  templateUrl: './app/demo.component.html',
  providers:[DataTable]

})
export class DemoComponent {

  public dataTable: DataTable<ICustomer>;

  @Input()
  get data() {
    return this.dataTable.data;
  }
  constructor(private http: Http) {
    this.dataTable = new DataTable<ICustomer>();
    http.get("app/data.json")
        .subscribe((data)=> {
          setTimeout(()=> {

            this.dataTable.data = data.json();
          }, 1000);
        });
  }

  private sortByWordLength = (a: any) => {
    return a.name.length;
  }

  public removeItem(item: any) {
    //this.data = _.filter(this.data, (elem)=>elem != item);
    console.log("Remove: ", item.email);
  }
}
