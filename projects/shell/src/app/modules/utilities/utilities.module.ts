import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilitiesComponent } from './utilities.component';
import { UtilitiesRoutingModule } from './utilities-routing.module';

@NgModule({
	declarations: [
		UtilitiesComponent
	],
	imports: [
		CommonModule,
		UtilitiesRoutingModule
	]
})
export class UtilitiesModule {
}
