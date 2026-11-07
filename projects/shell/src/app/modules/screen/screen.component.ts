import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';

// import {ToolScreenService} from "tool-screen-ang15";
import { ToolScreenService } from '../../../../../tool-screen-ang15/src/lib/services/tool-screen.service';

@Component({
	selector: 'app-screen',
	templateUrl: './screen.component.html',
	styleUrls: ['./screen.component.scss']
})
class ScreenComponent implements OnInit {
	public readonly screen = inject(ToolScreenService);

	@ViewChild('rootTool', { read: ElementRef })
	public set rootTool(ref: ElementRef<HTMLElement> | undefined) {
		this.screen.setWrapperRef(ref ?? null);
	}

	public ngOnInit(): void {
	}

	public shrink(): void {
		this.screen.setDevices({
			phoneMaxSize: 800,
			desktopMaxSize: 2000
		});
	}

	public refresh(): void {
		this.screen.refresh();
	}

	// destroy() НЕ вызываем — сервис root-scoped
}

export default ScreenComponent
