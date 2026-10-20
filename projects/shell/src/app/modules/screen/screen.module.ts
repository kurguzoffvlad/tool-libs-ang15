import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenComponent } from './screen.component';
import {ScreenRoutingModule} from "./screen-routing.module";

@NgModule({
  declarations: [
    ScreenComponent
  ],
  imports: [
      CommonModule,
      ScreenRoutingModule,
  ]
})
export class ScreenModule { }
