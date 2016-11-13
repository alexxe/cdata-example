import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { DemoComponent } from './demo.component';

import {DataTableModule} from "./../core";

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    DataTableModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [DemoComponent]
})

export class DemoModule {


}
