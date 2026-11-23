import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

import { InfoComponent } from './component/info.component';
import { InfoRoutingModule } from './info-routing.module';
import { ToolModalInfoAng15Module } from 'tool-modal-info-ang15';
import { MyCustomContentComponent } from "./my-custom-content.component";
import { MyMatDialogComponent } from "./my-mat-dialog/my-mat-dialog.component";

@NgModule({
	declarations: [
		InfoComponent,
		MyCustomContentComponent,
		MyMatDialogComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		InfoRoutingModule,
		ToolModalInfoAng15Module,
		MatDialogModule,
		MatButtonModule,
	]
})
export class InfoModule {
}
