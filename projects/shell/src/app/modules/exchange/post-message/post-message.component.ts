// post-message.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
	ExchangeLighthouse,
	ExchangePostMessageService,
	ExchangeSubscribeComponent,
	IExchangeSource,
	exchangeNameEnum,
} from 'tool-exchange-ang15';

/**
 * Демонстрационный компонент для ExchangePostMessageService.
 * Отправляет postMessage сам себе (window → window) и принимает его через listen$().
 * Наследует ExchangeSubscribeComponent — поэтому exch_-методы исполняются автоматически.
 */
@Component({
	selector: 'app-post-message',
	template: `
		<div style="border:1px solid #ff9800; padding:8px; margin:8px;">
			<h3>PostMessage Demo (сам себе)</h3>

			<input [(ngModel)]="newMessage" placeholder="Текст для отправки" />

			<button (click)="sendRunAction()">Отправить RunAction (exch_handlePostMessage)</button>
			<button (click)="sendChangeProperty()">Отправить ChangeProperty (exch_postMessageText)</button>

			<p><b>Получено сообщений:</b> {{ receivedCount }}</p>
			<p><b>Последнее сообщение:</b> {{ lastReceived | json }}</p>
			<p><b>exch_postMessageText:</b> {{ exch_postMessageText }}</p>
			<p><b>Вызовов exch_handlePostMessage:</b> {{ exch_handlePostMessageCount }}</p>
		</div>
	`,
})
export class PostMessageComponent extends ExchangeSubscribeComponent implements OnInit, OnDestroy {
	/** Имя класса наследника — обязательно должно совпадать с constructor.name. */
	public static readonly extendsClassName = 'PostMessageComponent';

	/** Поток для отписки от подписок при уничтожении компонента. */
	private readonly _destroyed$ = new Subject<void>();

	/** Текст, который будет отправлен в postMessage. */
	public newMessage = 'Привет из postMessage!';

	/** Счётчик полученных сообщений. */
	public receivedCount = 0;

	/** Последнее полученное сообщение (для отображения). */
	public lastReceived: IExchangeSource | null = null;

	/** Свойство, изменяемое через ChangeProperty. */
	public exch_postMessageText = '(пусто)';

	/** Счётчик вызовов exch_handlePostMessage. */
	public exch_handlePostMessageCount = 0;

	public constructor(
		private readonly _postMessage: ExchangePostMessageService,
		exchange: ExchangeLighthouse,
	) {
		super(PostMessageComponent.extendsClassName, exchange);
	}

	public ngOnInit(): void {
		this._postMessage
			.listen$()
			.pipe(takeUntil(this._destroyed$))
			.subscribe((source: any) => {
				this.receivedCount++;
				this.lastReceived = source;

				// Ретрансляция в ExchangeLighthouse — ExchangeSubscribeComponent
				// (базовый класс) применит exch_-валидацию и вызовет exch_handlePostMessage.
				this.exchange.send$(source, PostMessageComponent.extendsClassName);
			});
	}

	/** Отправляет RunAction самому себе. */
	public sendRunAction(): void {
		this._postMessage.send$(window, {
			from: PostMessageComponent.extendsClassName,
			to: PostMessageComponent.extendsClassName,
			source: {
				name: exchangeNameEnum.RunAction,
				data: {
					name: 'exch_handlePostMessage',
					arguments: [this.newMessage],
				},
			},
		});
	}

	/** Отправляет ChangeProperty самому себе. */
	public sendChangeProperty(): void {
		this._postMessage.send$(window, {
			from: PostMessageComponent.extendsClassName,
			to: PostMessageComponent.extendsClassName,
			source: {
				name: exchangeNameEnum.ChangeProperty,
				data: {
					name: 'exch_postMessageText',
					value: this.newMessage,
				},
			},
		});
	}

	/** Метод, вызываемый через RunAction (exch_-префикс обязателен). */
	public exch_handlePostMessage(text: string): void {
		this.exch_handlePostMessageCount++;
		this.exch_postMessageText = `Получено через RunAction: ${text}`;
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();

		this._destroyed$.next();
		this._destroyed$.complete();
	}
}
