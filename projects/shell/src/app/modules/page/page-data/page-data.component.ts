import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ExchangeLighthouse, ExchangeSubscribeComponent } from 'tool-exchange-ang15';
import { ScreenEnums, ToolScreenService } from 'tool-screen-ang15';

import { PageData1RequestService } from './services/page-data-1-request.service';
import { PageData2ServerService } from './services/page-data-2-server.service';
import { PageData3ParsedService } from './services/page-data-3-parsed.service';
import { PageData4FactoryService } from './services/page-data-4-factory.service';

@Component({
	selector: 'exch-page-data',
	templateUrl: './page-data.component.html',
	styleUrls: [ './page-data.component.scss' ]
})
export class PageDataComponent extends ExchangeSubscribeComponent implements OnInit, OnDestroy {
	static readonly extendsClassName = 'PageDataComponent';

	@Input() viewDataPage: any = {};
	@Input() filters: any;
	@Input() options: any;

	public ScreenEnums = ScreenEnums;

	public constructor(
		public requestService: PageData1RequestService,
		public serverService: PageData2ServerService,
		public parsedService: PageData3ParsedService,
		public factoryService: PageData4FactoryService,
		public screen: ToolScreenService,
		public override exchange: ExchangeLighthouse
	) {
		super(PageDataComponent.extendsClassName, exchange);
	}

	public ngOnInit(): void {
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
