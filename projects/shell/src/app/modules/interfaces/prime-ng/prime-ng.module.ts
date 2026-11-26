import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ---------- PrimeNG ----------
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox'; // для списка (опционально, можно использовать таблицу)
import { ConfirmationService, MessageService } from 'primeng/api';

import { PrimeNgComponent } from './prime-ng.component';
import { PrimeNgRoutingModule } from './prime-ng-routing.module';
import { CalendarModule } from "primeng/calendar";

@NgModule({
	declarations: [PrimeNgComponent],
	imports: [
		CommonModule,
		FormsModule,
		ButtonModule,
		CardModule,
		InputTextModule,
		DropdownModule,
		InputSwitchModule,
		TableModule,
		TagModule,
		ToastModule,
		ConfirmDialogModule,
		ToolbarModule,
		TooltipModule,
		BadgeModule,
		ProgressSpinnerModule,
		DividerModule,
		ListboxModule,
		PrimeNgRoutingModule,
		CalendarModule,
	],
	providers: [ConfirmationService, MessageService],
	exports: [PrimeNgComponent],
})
export class PrimeNgModule {}
