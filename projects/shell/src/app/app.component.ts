import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface LibOption {
	value: string;
	label: string;
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {
	libraries: LibOption[] = [
		{ value: 'tool-config-to-lib', label: 'tool-config-to-lib' },
		{ value: 'tool-dom', label: 'tool-dom' },
		{ value: 'tool-dynamic-component', label: 'tool-dynamic-component' },
		{ value: 'tool-exchange', label: 'tool-exchange' },
		{ value: 'tool-info', label: 'tool-info' },
		{ value: 'tool-interfaces', label: 'tool-interfaces' },
		{ value: 'tool-page', label: 'tool-page' },
		{ value: 'tool-screen', label: 'tool-screen' },
		{ value: 'tool-templates', label: 'tool-templates' },
		{ value: 'tool-utilities', label: 'tool-utilities' },
	];

	interfaces: LibOption[] =[
		{ value: 'tool-material', label: 'tool-material' },
		{ value: 'tool-ng-zorro', label: 'tool-ng-zorro' },
	]

	selectedLib = 'tool-config-to-lib';

	selectedInterfaces: string = 'tool-material';
	isVisibleInterfaces = false;

	private destroy$ = new Subject<void>();

	constructor(private router: Router) {
	}

	ngOnInit(): void {
		this.router.events
			.pipe(
				filter((e): e is NavigationEnd => e instanceof NavigationEnd),
				map(e => e.urlAfterRedirects.split('/')[1] || ''),
				takeUntil(this.destroy$),
			).subscribe(seg => {
				if (seg) this.selectedLib = seg;

				this.isVisibleInterfaces = seg === 'tool-interfaces';
				if ( this.isVisibleInterfaces) {
					this.selectedInterfaces = 'tool-material';
				}
			});
	}

	onLibChange(value: string): void {
		this.selectedLib = value;
		this.router.navigate([ `/${value}` ]);
	}

	onInterfacesChange(value: string) {
		this.selectedInterfaces = value;
		this.router.navigate([ `tool-interfaces/${value}` ]);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
