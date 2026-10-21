// modules/screen/screen-routing.module.ts
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {ScreenComponent} from "./screen.component";

const routes: Routes = [
	{path: '', component: ScreenComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ScreenRoutingModule {
}
