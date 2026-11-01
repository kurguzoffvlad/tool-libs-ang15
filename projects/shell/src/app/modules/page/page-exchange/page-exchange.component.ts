import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ExchangeLighthouse, ExchangeSubscribeComponent } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-exchange',
	templateUrl: './page-exchange.component.html',
	styleUrls: [ './page-exchange.component.scss' ]
})
export class PageExchangeComponent extends ExchangeSubscribeComponent implements OnInit, OnDestroy {
	private static readonly extendsClassName = 'PageExchangeComponent';

	@Input() public viewDataFields: any = {};

	public constructor(
		public override exchange: ExchangeLighthouse) {
		super(PageExchangeComponent.extendsClassName, exchange);
	}

	public ngOnInit(): void {
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
