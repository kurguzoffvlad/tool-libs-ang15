import { Component, OnDestroy } from '@angular/core';
import { ExchangeLighthouse, ExchangeSubscribeComponent, exchangeNameEnum } from 'tool-exchange-ang15';

@Component({
	selector: 'app-component-a',
	template: `
    <div style="border:1px solid #2196f3; padding:8px; margin:8px;">
      <h3>Компонент A (отправитель и подписчик)</h3>

      <input [(ngModel)]="newMessage" placeholder="Новое значение для B" />
      <button (click)="setPropertyInB()">Задать свойство B</button>
      <button (click)="runActionInB()">Вызвать метод B</button>

      <p><b>Метод A вызывался раз:</b> {{ methodACallCount }}</p>
      <p><b>Последний аргумент от B:</b> {{ lastArgFromB }}</p>
    </div>
  `
})
export class ComponentAComponent extends ExchangeSubscribeComponent implements OnDestroy {
	public static readonly extendsClassName = 'ComponentAComponent';

	public newMessage = 'Значение из A';
	public methodACallCount = 0;
	public lastArgFromB = '(ещё не вызывался)';

	public constructor(exchange: ExchangeLighthouse) {
		super(ComponentAComponent.extendsClassName, exchange);
	}

	public setPropertyInB(): void {
		this.exchange.send$(
			{
				from: ComponentAComponent.extendsClassName,
				to: 'ComponentBComponent',
				source: {
					name: exchangeNameEnum.ChangeProperty,
					data: { name: 'messageFromA', value: this.newMessage }
				}
			},
			ComponentAComponent.extendsClassName
		);
	}

	public runActionInB(): void {
		this.exchange.send$(
			{
				from: ComponentAComponent.extendsClassName,
				to: 'ComponentBComponent',
				source: {
					name: exchangeNameEnum.RunAction,
					data: {
						name: 'handleActionFromA',
						arguments: [`Текст от A: ${this.newMessage}`]
					}
				}
			},
			ComponentAComponent.extendsClassName
		);
	}

	/** Метод A, который вызывает компонент B через RunAction */
	public handleActionFromB(text: string): void {
		this.methodACallCount++;
		this.lastArgFromB = text;
		console.log('[A] handleActionFromB получил:', text);
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
