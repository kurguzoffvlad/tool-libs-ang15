import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { ExchangeLighthouse, ExchangeSubscribeComponent } from 'tool-exchange-ang15';
import { IScreenInfo, OrientationScreenEnum, ScreenEnums } from 'tool-screen-ang15';

@Component({
	selector: 'exch-page-detail-common-devices',
	template: `<ng-content></ng-content>`,
	styles: [ `
        :host {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            overflow: hidden;
        }
    ` ]
})
export class PageDetailCommonDevicesComponent extends ExchangeSubscribeComponent implements OnDestroy {
	@Input() screenInfo!: IScreenInfo;
	@Input() viewDataPage: any = {};
	@Input() filters: any;
	@Input() options: any;
	@Input() exchangeMessage: any;

	ScreenEnums = ScreenEnums;
	OrientationScreenEnum = OrientationScreenEnum;

	public constructor(
		@Inject(String) extendsClassName: string,
		public override exchange: ExchangeLighthouse
	) {
		super(extendsClassName, exchange);
	}

	public override ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
