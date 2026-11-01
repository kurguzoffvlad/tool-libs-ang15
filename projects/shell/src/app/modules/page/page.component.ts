import { Component, OnDestroy, OnInit } from '@angular/core';

import { ExchangeLighthouse, ExchangeSubscribeComponent } from 'tool-exchange-ang15';
import { ScreenEnums, ToolScreenService } from 'tool-screen-ang15';

export type PageTab = 'exchange' | 'detail' | 'data';

@Component({
	selector: 'app-page',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss']
})
export class PageComponent extends ExchangeSubscribeComponent implements OnInit, OnDestroy {
	private static readonly extendsClassName = 'PageComponent';

	public readonly ScreenEnums = ScreenEnums;

	// Активная вкладка — по умолчанию первая (PageExchange)
	public activeTab: PageTab = 'exchange';

	// Вкладки в требуемом порядке: exchange -> detail -> data
	public readonly tabs: Array<{ id: PageTab; label: string; hint: string }> = [
		{ id: 'exchange', label: 'PageExchange', hint: 'Обмен сообщениями через ExchangeLighthouse' },
		{ id: 'detail',   label: 'PageDetail',   hint: 'Адаптивная вёрстка детальной страницы' },
		{ id: 'data',     label: 'PageData',     hint: 'Пайплайн данных + адаптивная вёрстка' }
	];

	// Входные данные, которые пробрасываются во все три страницы
	public viewDataPage: any = {};
	public filters: any = { search: '', page: 1 };
	public options: any = {};

	public constructor(
		public screen: ToolScreenService,
		public override exchange: ExchangeLighthouse
	) {
		super(PageComponent.extendsClassName, exchange);
	}

	public ngOnInit(): void {
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	// ---- Управление вкладками ----
	public selectTab(tab: PageTab): void {
		this.activeTab = tab;
	}
}
