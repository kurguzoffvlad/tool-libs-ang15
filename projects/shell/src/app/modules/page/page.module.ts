import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { PageExchangeComponent } from './page-exchange/page-exchange.component';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { PageDetailCommonDevicesComponent } from './page-detail/devices/page-detail-common-devices.component';
import { PageDetailPhoneComponent } from './page-detail/devices/page-detail-phone/page-detail-phone.component';
import { PageDetailTabletComponent } from './page-detail/devices/page-detail-tablet/page-detail-tablet.component';
import { PageDetailDesktopComponent } from './page-detail/devices/page-detail-desktop/page-detail-desktop.component';
import { PageDataComponent } from './page-data/page-data.component';
import { PageDataCommonDevicesComponent } from './page-data/devices/page-data-common-devices.component';
import { PageDataPhoneComponent } from './page-data/devices/page-data-phone/page-data-phone.component';
import { PageDataTabletComponent } from './page-data/devices/page-data-tablet/page-data-tablet.component';
import { PageDataDesktopComponent } from './page-data/devices/page-data-desktop/page-data-desktop.component';

@NgModule({
	declarations: [PageComponent,
		PageExchangeComponent,
		PageDetailComponent,
		PageDetailCommonDevicesComponent,
		PageDetailPhoneComponent,
		PageDetailTabletComponent,
		PageDetailDesktopComponent,
		PageDataComponent,
		PageDataCommonDevicesComponent,
		PageDataPhoneComponent,
		PageDataTabletComponent,
		PageDataDesktopComponent
	],
	imports: [
		CommonModule,
		PageRoutingModule
	]
})
export class PageModule {
}
