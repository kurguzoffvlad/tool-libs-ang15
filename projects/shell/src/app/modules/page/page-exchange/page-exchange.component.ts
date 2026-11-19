import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExchangeLighthouse, ExchangeSubscribeComponent, exchangeNameEnum } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-exchange',
	templateUrl: './page-exchange.component.html',
	styleUrls: ['./page-exchange.component.scss']
})
export class PageExchangeComponent extends ExchangeSubscribeComponent implements OnInit, OnDestroy {
	private static readonly extendsClassName = 'PageExchangeComponent';

	@Input() public viewDataFields: any = {};

	public exch_exchChangeText: string = 'initial';
	public messageForDetail: string = 'Привет из PageExchange!';
	public receivedLog: string[] = [];

	public constructor(public override exchange: ExchangeLighthouse) {
		super(PageExchangeComponent.extendsClassName, exchange);
	}

	public ngOnInit(): void {}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	// ---- 1. Меняем СВОЁ свойство ----
	public sendChangeProperty(value: string): void {
		this.exchange.send$({
			from: PageExchangeComponent.extendsClassName,
			to: PageExchangeComponent.extendsClassName,
			source: {
				name: exchangeNameEnum.ChangeProperty,
				data: { name: 'exch_exchChangeText', value }
			}
		}, PageExchangeComponent.extendsClassName);

		this.addLog(`Своё свойство изменено на "${value}"`);
	}

	// ---- 2. Меняем свойство в PageDetailComponent ----
	public sendToPageDetail(): void {
		this.exchange.send$({
			from: PageExchangeComponent.extendsClassName,
			to: 'PageDetailComponent',
			source: {
				name: exchangeNameEnum.ChangeProperty,
				data: { name: 'exch_exchangeMessage', value: this.messageForDetail }
			}
		}, PageExchangeComponent.extendsClassName);

		this.addLog(`В PageDetailComponent отправлено: "${this.messageForDetail}"`);
	}

	// ---- 3. Вызываем метод в PageDetailComponent ----
	public callDetailAction(): void {
		this.exchange.send$({
			from: PageExchangeComponent.extendsClassName,
			to: 'PageDetailComponent',
			source: {
				name: exchangeNameEnum.RunAction,
				data: { name: 'exch_handleExchangeAction', arguments: [ 'Пинг из PageExchange' ] }
			}
		}, PageExchangeComponent.extendsClassName);

		this.addLog('В PageDetailComponent вызван метод exch_handleExchangeAction()');
	}

	private addLog(text: string): void {
		this.receivedLog = [ `${new Date().toLocaleTimeString()} — ${text}`, ...this.receivedLog ].slice(0, 8);
	}
}
