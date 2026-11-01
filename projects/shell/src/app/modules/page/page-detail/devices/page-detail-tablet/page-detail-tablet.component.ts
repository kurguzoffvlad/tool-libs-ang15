import { Component } from '@angular/core';

import { PageDetailCommonDevicesComponent } from '../page-detail-common-devices.component';
import { ExchangeLighthouse } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-detail-tablet',
	templateUrl: './page-detail-tablet.component.html',
	styleUrls: [ './page-detail-tablet.component.scss' ]
})
export class PageDetailTabletComponent extends PageDetailCommonDevicesComponent {
	private static readonly extendsClassName = 'PageDetailTabletComponent';

	public constructor(
		public override exchange: ExchangeLighthouse,
	) {
		super(
			PageDetailTabletComponent.extendsClassName,
			exchange
		);
	}
}
