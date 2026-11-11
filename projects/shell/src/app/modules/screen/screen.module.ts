import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ScreenComponent from './screen.component';
import { ScreenRoutingModule } from "./screen-routing.module";
import { ThemeModule } from "tool-screen-ang15";

@NgModule({
	declarations: [
		ScreenComponent
	],
	imports: [
		CommonModule,
		ScreenRoutingModule,
		ThemeModule,
	]
})
export class ScreenModule {
}
