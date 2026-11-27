import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormRoutingModule } from "./dynamic-form-routing.module";


@NgModule({
	declarations: [
		DynamicFormComponent
	],
	imports: [
		CommonModule,
		DynamicFormRoutingModule,
		ReactiveFormsModule
	]
})
export class DynamicFormModule {
}
