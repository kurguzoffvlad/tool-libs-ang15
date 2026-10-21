import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { ToolConfigToLibAng15Module } from 'tool-config-to-lib-ang15';
import { configFromApp } from './modules/config/tool-config-to-lib.config';

import { provideToolScreenConfig } from 'tool-screen-ang15';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		ToolConfigToLibAng15Module.forRoot(configFromApp),
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
		}
	) ], // или - providers: [ provideToolScreenConfig()],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}
