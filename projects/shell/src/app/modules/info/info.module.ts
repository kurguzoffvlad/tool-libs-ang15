import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoComponent } from './info.component';
import { InfoRoutingModule } from './info-routing.module';
import { ToolUserInfoAng15Module } from 'tool-user-info-ang15';

@NgModule({
	declarations: [
		InfoComponent
	],
	imports: [
		CommonModule,
		InfoRoutingModule,
		ToolUserInfoAng15Module
	]
})
export class InfoModule {
}
