import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WidthComponent} from "./width.component";

const routes: Routes = [
	{path: '', component: WidthComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WidthRoutingModule {
}
