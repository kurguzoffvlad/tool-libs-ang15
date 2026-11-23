// info.component.ts
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { firstValueFrom } from 'rxjs';

import { ToolModalInfoAng15Service } from 'tool-modal-info-ang15';
import { MyCustomContentComponent } from '../my-custom-content.component';
import { MyMatDialogComponent } from '../my-mat-dialog/my-mat-dialog.component';

/** Результат кастомного диалога */
interface IMyDialogResult {
	readonly button: 'yes' | 'no';
	readonly value: string;
}

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
	public modalDialog: IMyDialogResult | null = null;

	public constructor(
		private readonly _userInfo: ToolModalInfoAng15Service,
		private readonly _dialog: MatDialog,
	) {}

	public async showPrompt(): Promise<void> {
		this.modalDialog = await this._userInfo.open<IMyDialogResult>(
			MyCustomContentComponent,
			{
				title: 'Ваше имя',
				message: 'Введите имя для продолжения.',
				placeholder: 'Например, Иван',
				value: 'Иван',
			},
		);
	}

	public async showMatDialog(): Promise<void> {
		const ref = this._dialog.open<MyMatDialogComponent, any, IMyDialogResult>(
			MyMatDialogComponent,
			{
				data: {
					title: 'Ваше имя',
					message: 'Введите имя для продолжения.',
					placeholder: 'Например, Иван',
					value: 'Иван',
				},
				width: '480px',
			},
		);

		this.modalDialog = (await firstValueFrom(ref.afterClosed())) ?? null;
	}
}
