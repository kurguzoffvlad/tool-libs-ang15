import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialComponent } from "./material.component";

const routes: Routes = [
	{ path: '', component: MaterialComponent },
	{ path: 'tool-material', component: MaterialComponent },
	{
		path: 'tool-ng-zorro',
		loadChildren: () =>
			import('../ng-zorro/ng-zorro.module').then(m => m.NgZorroModule),
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MaterialRoutingModule {
}
