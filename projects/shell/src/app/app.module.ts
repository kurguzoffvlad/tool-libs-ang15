import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';

import {ToolScreenAng15Module} from "tool-screen-ang15";
import {ToolConfigToLibAng15Module} from "tool-config-to-lib-ang15";

import {configFromApp} from "./modules/config/tool-config-to-lib.interface";
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ToolScreenAng15Module.forRoot(),
        ToolConfigToLibAng15Module.forRoot(configFromApp)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
