import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'tool-config-to-lib', pathMatch: 'full' },

	{
		path: 'tool-config-to-lib',
		loadChildren: () =>
			import('./modules/config/config.module').then(m => m.ConfigModule),
	},
	{
		path: 'tool-dom',
		loadChildren: () =>
			import('./modules/dom/dom.module').then(m => m.DomModule),
	},
	{
		path: 'tool-exchange',
		loadChildren: () =>
			import('./modules/exchange/exchange.module').then(m => m.ExchangeModule),
	},
	{
		path: 'tool-page',
		loadChildren: () =>
			import('./modules/page/page.module').then(m => m.PageModule),
	},
	{
		path: 'tool-screen',
		loadChildren: () =>
			import('./modules/screen/screen.module').then(m => m.ScreenModule),
	},
	{
		path: 'tool-utilities',
		loadChildren: () =>
			import('./modules/utilities/utilities.module').then(m => m.UtilitiesModule),
	},
	{
		path: 'tool-dynamic-component',
		loadChildren: () =>
			import('./modules/dynamic-component/dynamic-component.module').then(m => m.DynamicComponentModule),
	},
	{
		path: 'tool-templates',
		loadChildren: () =>
			import('./modules/templates/templates.module').then(m => m.TemplatesModule),
	},

	{ path: '**', redirectTo: 'tool-config-to-lib' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
