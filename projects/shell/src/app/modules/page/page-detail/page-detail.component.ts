import { Component, Input, OnDestroy } from '@angular/core';

import { ScreenEnums, ToolScreenService } from 'tool-screen-ang15';
import { ExchangeLighthouse, ExchangeSubscribeComponent } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-detail',
	templateUrl: './page-detail.component.html',
	styleUrls: [ './page-detail.component.scss' ]
})
export class PageDetailComponent extends ExchangeSubscribeComponent implements OnDestroy {
	public static readonly extendsClassName = 'PageDetailComponent';

	@Input() viewDataPage: any = {};
	@Input() filters: any;
	@Input() options: any;

	public ScreenEnums = ScreenEnums;

	// Свойство, которое меняем из PageExchange
	public exch_exchangeMessage: string = 'Начальное сообщение (PageDetail)';

	// Счётчик вызовов метода через RunAction
	public exchangeActionCallCount = 0;

	public constructor(
		public screen: ToolScreenService,
		public override exchange: ExchangeLighthouse
	) {
		super(PageDetailComponent.extendsClassName, exchange);
	}

	/** Метод, вызываемый из PageExchange через RunAction */
	public exch_handleExchangeAction(text: string): void {
		this.exchangeActionCallCount++;
		this.exch_exchangeMessage = `RunAction: ${text} (вызов #${this.exchangeActionCallCount})`;
	}

	public override ngOnDestroy(): void {
		console.log('---------------------------------------------')
		super.ngOnDestroy();
	}
}
