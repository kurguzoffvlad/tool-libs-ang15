import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
	{path: '', redirectTo: 'tool-width-page', pathMatch: 'full'},

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
		path: 'tool-width-page',
		loadChildren: () =>
			import('./modules/width/width.module').then(m => m.WidthModule),
	},

	{path: '**', redirectTo: 'tool-width-page'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}
