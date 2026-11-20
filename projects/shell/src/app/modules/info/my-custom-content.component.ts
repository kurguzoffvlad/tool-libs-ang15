import { Component, Input } from '@angular/core';

import { ToolUserInfoAng15Service } from 'tool-user-info-ang15';

/** Результат кастомного диалога */
interface IMyDialogResult {
	/** Нажатая кнопка */
	readonly button: 'yes' | 'no';
	/** Введённое значение */
	readonly value: string;
}

/**
 * Пример кастомного диалога: заголовок, текст, input, кнопки.
 */
@Component({
	selector: 'app-my-custom-content',
	template: `
		<div class="my-dialog">
			<h3 class="my-dialog__title">{{ title }}</h3>

			<p class="my-dialog__message">{{ message }}</p>

			<input
				class="my-dialog__input"
				type="text"
				[(ngModel)]="value"
				[placeholder]="placeholder"
			/>

			<div class="my-dialog__actions">
				<button
					type="button"
					class="my-dialog__btn my-dialog__btn--primary"
					(click)="onConfirm()"
				>
					Да
				</button>

				<button
					type="button"
					class="my-dialog__btn"
					(click)="onCancel()"
				>
					Нет
				</button>
			</div>
		</div>
	`,
	styles: [ `
		.my-dialog {
			background: #fff;
			border-radius: 8px;
			padding: 24px;
			min-width: 320px;
			max-width: 480px;
			box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
		}

		.my-dialog__title {
			margin: 0 0 12px;
			font-size: 18px;
		}

		.my-dialog__message {
			margin: 0 0 16px;
		}

		.my-dialog__input {
			width: 100%;
			padding: 8px;
			margin-bottom: 16px;
			box-sizing: border-box;
		}

		.my-dialog__actions {
			display: flex;
			justify-content: flex-end;
			gap: 8px;
		}

		.my-dialog__btn {
			padding: 8px 16px;
			border: 1px solid #ccc;
			background: #f5f5f5;
			border-radius: 4px;
			cursor: pointer;
		}

		.my-dialog__btn--primary {
			background: #1976d2;
			color: #fff;
			border-color: #1976d2;
		}
	` ],
})
export class MyCustomContentComponent {
	/** Заголовок диалога */
	@Input()
	public title = 'Введите имя';

	/** Текст сообщения */
	@Input()
	public message = 'Поле обязательно для продолжения.';

	/** Placeholder для input */
	@Input()
	public placeholder = 'Иван';

	/** Текущее значение */
	@Input()
	public value = '';

	public constructor(
		private readonly _userInfo: ToolUserInfoAng15Service,
	) {
	}

	/** Подтвердить */
	public onConfirm(): void {
		const result: IMyDialogResult = { button: 'yes', value: this.value || 'Иван' };

		this._userInfo.close(result);
	}

	/** Отменить */
	public onCancel(): void {
		const result: IMyDialogResult = { button: 'no', value: '' };

		this._userInfo.close(result);
	}
}
