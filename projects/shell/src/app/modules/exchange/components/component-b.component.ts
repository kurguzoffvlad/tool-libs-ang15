import { Component, OnDestroy } from '@angular/core';
import { ExchangeLighthouse, ExchangeSubscribeComponent } from 'tool-exchange-ang15';

@Component({
	selector: 'app-component-b',
	template: `
    <div style="border:1px solid #4caf50; padding:8px; margin:8px;">
      <h3>Компонент B (подписчик)</h3>
      <p><b>Полученное свойство messageFromA:</b> {{ messageFromA }}</p>
      <p><b>Счётчик вызовов метода B:</b> {{ methodBCallCount }}</p>
      <button (click)="callA()">Вызвать метод компонента A</button>
    </div>
  `
})
export class ComponentBComponent extends ExchangeSubscribeComponent implements OnDestroy {
	// Имя класса наследника — обязательно должно совпадать с constructor.name
	public static readonly extendsClassName = 'ComponentBComponent';

	// Свойство, которое будет менять компонент A через ChangeProperty
	public messageFromA = '(пусто)';

	// Счётчик для наглядности
	public methodBCallCount = 0;

	public constructor(exchange: ExchangeLighthouse) {
		// Второй аргумент — имя класса наследника
		super(ComponentBComponent.extendsClassName, exchange);
	}

	// Метод, который будет вызывать компонент A через RunAction
	public handleActionFromA(text: string): void {
		this.methodBCallCount++;
		console.log('[B] handleActionFromA получил аргумент:', text);
		this.messageFromA = `A вызвал B с аргументом: ${text}`;
	}

	// Компонент B сам вызывает метод компонента A
	public callA(): void {
		this.exchange.send$(
			{
				from: ComponentBComponent.extendsClassName,
				to: 'ComponentAComponent',
				source: {
					name: 'runAction' as any, // exchangeNameEnum.RunAction
					data: {
						name: 'handleActionFromB',
						arguments: ['Привет из B!']
					}
				}
			},
			ComponentBComponent.extendsClassName
		);
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
