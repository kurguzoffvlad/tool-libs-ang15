import { Component } from '@angular/core';

import {
	IUserInfoPromptResult,
	ToolUserInfoAng15Service,
	UserInfoAlign,
} from 'tool-user-info-ang15';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
	/** Результат последнего alert */
	public lastAlertButton: string = '';

	/** Результат последнего prompt */
	public lastPrompt: IUserInfoPromptResult | null = null;

	public constructor(private readonly _userInfo: ToolUserInfoAng15Service) {}

	/** Показать alert и сохранить нажатую кнопку */
	public async showAlert(): Promise<void> {
		this.lastAlertButton = await this._userInfo.alert({
			title: 'Внимание',
			message: 'Продолжить?',
			buttons: [
				{ label: 'Да', value: 'yes', primary: true },
				{ label: 'Нет', value: 'no' },
			],
			size: { width: '500px', maxWidth: '90vw', padding: '32px' },
			titleStyle: {
				align: UserInfoAlign.Center,
				style: { color: '#1976d2', fontSize: '22px' },
			},
			messageStyle: {
				align: UserInfoAlign.Left,
				style: { fontSize: '16px', lineHeight: '1.5' },
			},
			buttonsLayout: {
				align: UserInfoAlign.Center,
				direction: 'row',
				style: { gap: '12px' },
			},
		});
	}

	/** Показать prompt и сохранить результат */
	public async showPrompt(): Promise<void> {
		this.lastPrompt = await this._userInfo.prompt({
			title: 'Имя',
			message: 'Введите имя',
			placeholder: 'Иван',
			buttons: [
				{ label: 'Да', value: 'yes', primary: true },
				{ label: 'Нет', value: 'no' },
				{ label: 'ХЗ', value: 'хз' },
			],
			size: { width: '600px', maxWidth: '90vw', padding: '32px' },
			titleStyle: {
				align: UserInfoAlign.Center,
				style: { color: '#1976d2', fontSize: '22px' },
			},
			messageStyle: {
				align: UserInfoAlign.Left,
				style: { fontSize: '16px', lineHeight: '1.5' },
			},
			buttonsLayout: {
				align: UserInfoAlign.Center,
				direction: 'column',
				style: { gap: '12px' },
			},
			inputStyle: {
				style: { fontSize: '16px', padding: '12px' },
			},
			dialogClass: 'my-custom-dialog',
			dialogStyle: { borderRadius: '16px' },
		});
	}
}
