import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { ToolConfigToLibAng15Module } from 'tool-config-to-lib-ang15';
import { configFromApp } from './modules/config/tool-config-to-lib.config';

import { provideToolScreenConfig } from 'tool-screen-ang15';

import { AppComponent } from './app.component';

import { ToolTemplatesAng15Module } from 'tool-templates-ang15';
import { ToolDynamicComponentAng15Module } from 'tool-dynamic-component-ang15';
import { ToolModalInfoAng15Module } from "tool-modal-info-ang15";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./modules/interfaces/material/material.module";
import { NgZorroModule } from "./modules/interfaces/ng-zorro/ng-zorro.module";

import { NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';

registerLocaleData(ru); // <-- ОБЯЗАТЕЛЬНО для датапикера в NgZorroModule

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		ToolConfigToLibAng15Module.forRoot(configFromApp),
		ToolDynamicComponentAng15Module,
		ToolTemplatesAng15Module,
		ToolModalInfoAng15Module,
		BrowserAnimationsModule,   // анимации Material (без них компоненты не работают)
		MaterialModule,
		NgZorroModule,
	],
	providers: [ provideToolScreenConfig(
		{
			devices:
				{
					phoneMaxSize: 933,
					tabletMaxSize: 1366,
					desktopMaxSize: 1500
				},
			resizeDebounceMs: 100
		}),
		{ provide: NZ_I18N, useValue: ru_RU }
	], // или - providers: [ provideToolScreenConfig()],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}
