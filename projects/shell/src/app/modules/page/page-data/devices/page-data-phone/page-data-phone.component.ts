import { Component } from '@angular/core';

import { PageDataCommonDevicesComponent } from '../page-data-common-devices.component';
import { ExchangeLighthouse } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-data-phone',
	templateUrl: './page-data-phone.component.html',
	styleUrls: [ './page-data-phone.component.scss' ]
})
export class PageDataPhoneComponent extends PageDataCommonDevicesComponent {
	private static readonly extendsClassName = 'PageDataPhoneComponent';

	public constructor(
		public override exchange: ExchangeLighthouse,
	) {
		super(
			PageDataPhoneComponent.extendsClassName,
			exchange
		);
	}
}
