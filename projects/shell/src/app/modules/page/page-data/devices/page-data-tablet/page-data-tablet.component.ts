import { Component } from '@angular/core';

import { PageDataCommonDevicesComponent } from '../page-data-common-devices.component';
import { ExchangeLighthouse } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-data-tablet',
	templateUrl: './page-data-tablet.component.html',
	styleUrls: [ './page-data-tablet.component.scss' ]
})
export class PageDataTabletComponent extends PageDataCommonDevicesComponent {
	private static readonly extendsClassName = 'PageDataTabletComponent';

	public constructor(
		public override exchange: ExchangeLighthouse,
	) {
		super(
			PageDataTabletComponent.extendsClassName,
			exchange
		);
	}
}
