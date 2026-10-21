import {Component, inject, OnInit} from '@angular/core';

// import {ToolScreenService} from "tool-screen-ang15";
import {ToolScreenService} from '../../../../../tool-screen-ang15/src/lib/services/tool-screen.service';

@Component({
	selector: 'app-screen',
	templateUrl: './screen.component.html',
	styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {
	public readonly screen = inject(ToolScreenService);

	public ngOnInit(): void {
		console.log('[Screen]', this.screen.state);
	}

	public shrink(): void {
		this.screen.setDevices({phoneMaxSize: 800});
	}

	public refresh(): void {
		this.screen.refresh();
	}

	// destroy() НЕ вызываем — сервис root-scoped
}
