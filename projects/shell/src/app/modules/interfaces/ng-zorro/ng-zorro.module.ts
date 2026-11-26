import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// ---------- ng-zorro ----------
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgZorroComponent } from './ng-zorro.component';
import { NgZorroRoutingModule } from './ng-zorro-routing.module';
import * as AllIcons from '@ant-design/icons-angular/icons';

const antDesignIcons = AllIcons as {
	[key: string]: any;
};
const icons: any[] = Object.keys(antDesignIcons)
	.filter(key => key.endsWith('Outline') || key.endsWith('Fill') || key.endsWith('Twotone'))
	.map(key => antDesignIcons[key]);

@NgModule({
	declarations: [NgZorroComponent],
	imports: [
		CommonModule,
		FormsModule,
		NzIconModule,
		NzLayoutModule,
		NzCardModule,
		NzFormModule,
		NzInputModule,
		NzDatePickerModule,
		NzSelectModule,
		NzButtonModule,
		NzListModule,
		NzSwitchModule,
		NzTagModule,
		NzDividerModule,
		NzMessageModule,
		NzTableModule,
		NzModalModule,
		NzToolTipModule,
		NzBadgeModule,
		NzDropDownModule,
		NzSpinModule,
		NgZorroRoutingModule,
	],
	providers: [
		{ provide: NZ_ICONS, useValue: icons }
	],
	exports: [NgZorroComponent],
})
export class NgZorroModule {}
