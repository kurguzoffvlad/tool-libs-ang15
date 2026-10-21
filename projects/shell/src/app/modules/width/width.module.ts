import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidthRoutingModule } from './width-routing.module';
import { WidthComponent } from './width.component';


@NgModule({
  declarations: [
    WidthComponent
  ],
  imports: [
    CommonModule,
    WidthRoutingModule
  ]
})
export class WidthModule { }
