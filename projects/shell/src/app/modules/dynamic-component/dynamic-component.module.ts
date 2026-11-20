import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentComponent } from './dynamic-component.component';
import { ToolDynamicComponentAng15Module } from "tool-dynamic-component-ang15";

@NgModule({
	declarations: [ DynamicComponentComponent
	],
	imports: [
		CommonModule,
		ToolDynamicComponentAng15Module,
	]
})
export class DynamicComponentModule {
}
