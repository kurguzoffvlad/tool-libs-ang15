import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ExchangeLighthouse, ExchangeSubscribeComponent } from 'tool-exchange-ang15';
import { ScreenEnums, ToolScreenService } from 'tool-screen-ang15';

import { PageData1RequestService } from './services/page-data-1-request.service';
import { PageData2ServerService } from './services/page-data-2-server.service';
import { PageData3ParsedService } from './services/page-data-3-parsed.service';
import { PageData4FactoryService, IPageDataViewModel } from './services/page-data-4-factory.service';

import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

	public dataItems: IPageDataViewModel[] = [];
	public isLoading: boolean = false;
	public errorMessage: string | null = null;

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
		this.loadData();
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	public loadData(): void {
		this.isLoading = true;
		this.errorMessage = null;

		// 1. Request
		const config = this.requestService.start();

		// 2. Server (выполнение HTTP-запроса)
		this.serverService.start(config).pipe(
			// 3. Parsed
			map((serverResult) => this.parsedService.start(serverResult)),

			// 4. Factory
			map((parsedResult) => this.factoryService.start(parsedResult)),

			// Обработка ошибок
			catchError((error) => {
				console.error('Ошибка получения данных:', error);
				this.errorMessage = 'Не удалось загрузить данные с сервера';
				this.isLoading = false;
				return of([]); // Возвращаем пустой массив
			})
		).subscribe({
			next: (items) => {
				this.dataItems = items;
			},
			error: () => {}, // Уже обработан в catchError
			complete: () => {
				this.isLoading = false;
			}
		});
	}
}
