import { Component } from '@angular/core';

import { ToolModalInfoAng15Service } from 'tool-modal-info-ang15';
import { MyCustomContentComponent } from '../my-custom-content.component';

/** Результат кастомного диалога */
interface IMyDialogResult {
	/** Нажатая кнопка */
	readonly button: 'yes' | 'no';
	/** Введённое значение */
	readonly value: string;
}

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
	/** Результат последнего alert */
	public lastAlertButton: string = '';

	/** Результат последнего prompt */
	public lastPrompt: IMyDialogResult | null = null;

	public constructor(private readonly _userInfo: ToolModalInfoAng15Service) {
	}

	/** Открыть кастомный диалог и получить ответ */
	public async showPrompt(): Promise<void> {
		this.lastPrompt = await this._userInfo.open<IMyDialogResult>(
			MyCustomContentComponent,
			{
				title: 'Ваше имя',
				message: 'Введите имя для продолжения.',
				placeholder: 'Например, Иван',
				value: 'Иван',
			},
		);
	}
}
