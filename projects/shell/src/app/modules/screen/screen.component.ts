import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';

// import {ToolScreenService} from "tool-screen-ang15";
import { ToolScreenService } from '../../../../../tool-screen-ang15/src/lib/services/tool-screen.service';
import { ThemeLighthouse } from "../../../../../tool-screen-ang15/src/lib/theme/theme.lighthouse";

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

	public constructor(
		private readonly themeLighthouse: ThemeLighthouse
	){}

	public ngOnInit(): void {
		this.themeLighthouse.send$(
			{
				name: 'green'
			}, 'AppComponent');
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
