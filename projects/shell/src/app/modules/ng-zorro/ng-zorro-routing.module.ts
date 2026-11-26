import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgZorroComponent } from './ng-zorro.component';

const routes: Routes = [
	{ path: '', component: NgZorroComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NgZorroRoutingModule {}
