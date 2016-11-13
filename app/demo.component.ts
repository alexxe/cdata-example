import { Component } from '@angular/core';
import {Http} from "@angular/http";
import * as _ from "lodash";


@Component({
  selector: 'my-app',
  templateUrl: './app/demo.component.html'


})
export class DemoComponent {
  private data;

  constructor(private http: Http) {
    http.get("app/data.json")
        .subscribe((data)=> {
          setTimeout(()=> {
            this.data = data.json();
          }, 1000);
        });
  }

  private sortByWordLength = (a: any) => {
    return a.name.length;
  }

  public removeItem(item: any) {
    this.data = _.filter(this.data, (elem)=>elem != item);
    console.log("Remove: ", item.email);
  }
}
