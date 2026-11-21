import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { InfoComponent } from './component/info.component';
import { InfoRoutingModule } from './info-routing.module';
import { ToolModalInfoAng15Module } from 'tool-modal-info-ang15';
import { MyCustomContentComponent } from "./my-custom-content.component";

@NgModule({
	declarations: [
		InfoComponent,
		MyCustomContentComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		InfoRoutingModule,
		ToolModalInfoAng15Module,
	]
})
export class InfoModule {
}
