// confirm-dialog.component.ts — модальное окно подтверждения удаления

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
	title: string;    // заголовок окна
	message: string;  // текст вопроса
}

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

	constructor(
		// ссылка на само окно — чтобы закрыть его с результатом
		public dialogRef: MatDialogRef<ConfirmDialogComponent>,
		// данные, переданные при открытии окна
		@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
	) {}

	// закрывает окно с ответом "да"
	confirm(): void { this.dialogRef.close(true); }

	// закрывает окно с ответом "нет"
	cancel(): void  { this.dialogRef.close(false); }
}
