import { Component } from '@angular/core';

import { PageDetailCommonDevicesComponent } from '../page-detail-common-devices.component';
import { ExchangeLighthouse } from 'tool-exchange-ang15';

@Component({
	selector: 'exch-page-detail-desktop',
	templateUrl: './page-detail-desktop.component.html',
	styleUrls: [ './page-detail-desktop.component.scss' ]
})
export class PageDetailDesktopComponent extends PageDetailCommonDevicesComponent {
	private static readonly extendsClassName = 'PageDetailDesktopComponent';

	public constructor(
		public override exchange: ExchangeLighthouse,
	) {
		super(
			PageDetailDesktopComponent.extendsClassName,
			exchange
		);
	}
}
