import { Component, Input, OnDestroy } from '@angular/core';

import { ScreenEnums, ToolScreenService } from 'tool-screen-ang15';

@Component({
	selector: 'exch-page-detail',
	templateUrl: './page-detail.component.html',
	styleUrls: [ './page-detail.component.scss' ]
})

export class PageDetailComponent implements OnDestroy {
	private static readonly extendsClassName = 'PageDetailComponent';

	@Input() viewDataPage: any = {};
	@Input() filters: any;
	@Input() options: any;

	public ScreenEnums = ScreenEnums;

	public constructor(public screen: ToolScreenService) {
	}

	public ngOnDestroy(): void {
	}
}
