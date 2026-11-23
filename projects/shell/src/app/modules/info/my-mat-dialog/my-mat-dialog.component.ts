// my-mat-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/** Данные диалога */
export interface IMyMatDialogData {
	readonly title: string;
	readonly message: string;
	readonly placeholder: string;
	readonly value: string;
}

/** Результат диалога */
export interface IMyMatDialogResult {
	readonly button: 'yes' | 'no';
	readonly value: string;
}

@Component({
	selector: 'app-my-mat-dialog',
	template: `
		<h2 mat-dialog-title>{{ data.title }}</h2>

		<mat-dialog-content>
			<p>{{ data.message }}</p>
			<input
				class="my-dialog__input"
				type="text"
				[(ngModel)]="value"
				[placeholder]="data.placeholder"
			/>
		</mat-dialog-content>

		<mat-dialog-actions align="end">
			<button type="button" mat-button (click)="onCancel()">Нет</button>
			<button type="button" mat-raised-button color="primary" (click)="onConfirm()">Да</button>
		</mat-dialog-actions>
	`,
	styles: [ `
		.my-dialog__input {
			width: 100%;
			padding: 8px;
			box-sizing: border-box;
		}
	` ],
})
export class MyMatDialogComponent {
	public value: string;

	public constructor(
		@Inject(MAT_DIALOG_DATA) public readonly data: IMyMatDialogData,
		private readonly _ref: MatDialogRef<MyMatDialogComponent, IMyMatDialogResult>,
	) {
		this.value = data.value;
	}

	public onConfirm(): void {
		this._ref.close({ button: 'yes', value: this.value || 'Иван' });
	}

	public onCancel(): void {
		this._ref.close({ button: 'no', value: '' });
	}
}
