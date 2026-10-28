import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { ExchangeComponent } from './exchange.component';
import { ComponentBComponent } from './components/component-b.component';
import { ComponentAComponent } from './components/component-a.component';


@NgModule({
	declarations: [
		ExchangeComponent,
		ComponentAComponent,
		ComponentBComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		ExchangeRoutingModule
	]
})
export class ExchangeModule {
}
