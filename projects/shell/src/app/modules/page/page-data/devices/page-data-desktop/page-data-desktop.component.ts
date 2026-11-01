import { Component } from '@angular/core';

import { PageDataCommonDevicesComponent } from '../page-data-common-devices.component';
import { ExchangeLighthouse } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-data-desktop',
	templateUrl: './page-data-desktop.component.html',
	styleUrls: [ './page-data-desktop.component.scss' ]
})
export class PageDataDesktopComponent extends PageDataCommonDevicesComponent {
	private static readonly extendsClassName = 'PageDataDesktopComponent';

	public constructor(
		public override exchange: ExchangeLighthouse,
	) {
		super(
			PageDataDesktopComponent.extendsClassName,
			exchange
		);
	}
}
