import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import {ToolDomAng15Module} from "tool-dom-ang15";
import {ToolExchangeAng15Module} from "tool-exchange-ang15";
import {ToolWidthPageAng15Module} from "tool-width-page-ang15";
import {ToolConfigToLibAng15Module} from "tool-config-to-lib-ang15";
import {configFromApp} from "./tool-config-to-lib/tool-config-to-lib.interface";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ToolDomAng15Module,
    ToolExchangeAng15Module,
    ToolWidthPageAng15Module,
    ToolConfigToLibAng15Module.forRoot(configFromApp)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
