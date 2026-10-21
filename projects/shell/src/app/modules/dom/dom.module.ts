import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DomRoutingModule} from './dom-routing.module';
import {DomComponent} from './dom.component';


@NgModule({
	declarations: [
		DomComponent
	],
	imports: [
		CommonModule,
		DomRoutingModule
	]
})
export class DomModule {
}
