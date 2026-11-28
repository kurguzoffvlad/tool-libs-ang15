import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ToolDynamicFormAng15Module } from 'tool-dynamic-form-ang15';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormRoutingModule } from './dynamic-form-routing.module';


@NgModule({
	declarations: [
		DynamicFormComponent
	],
	imports: [
		CommonModule,
		DynamicFormRoutingModule,
		ReactiveFormsModule,
		ToolDynamicFormAng15Module
	]
})
export class DynamicFormModule {
}
