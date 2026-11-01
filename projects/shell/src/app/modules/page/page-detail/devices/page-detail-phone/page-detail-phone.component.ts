import { Component } from '@angular/core';

import { PageDetailCommonDevicesComponent } from '../page-detail-common-devices.component';
import { ExchangeLighthouse } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-detail-phone',
	templateUrl: './page-detail-phone.component.html',
	styleUrls: [ './page-detail-phone.component.scss' ]
})
export class PageDetailPhoneComponent extends PageDetailCommonDevicesComponent {
	private static readonly extendsClassName = 'PageDetailPhoneComponent';

	public constructor(
		public override exchange: ExchangeLighthouse,
	) {
		super(
			PageDetailPhoneComponent.extendsClassName,
			exchange
		);
	}
}
