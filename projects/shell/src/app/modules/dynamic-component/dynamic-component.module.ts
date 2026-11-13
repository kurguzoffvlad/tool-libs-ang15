import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentComponent } from './dynamic-component.component';
import { DynamicSlotDirective } from "tool-dynamic-component-ang15";
import { DynamicComponentRoutingModule } from "./dynamic-component-routing.module";

@NgModule({
	declarations: [ DynamicComponentComponent
	],
	imports: [
		CommonModule,
		DynamicSlotDirective,
		DynamicComponentRoutingModule,
	]
})
export class DynamicComponentModule {
}
