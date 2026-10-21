import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ToolConfigToLibAng15Service } from 'tool-config-to-lib-ang15';

interface LibOption { value: string; label: string; }

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    libraries: LibOption[] = [
        { value: 'tool-width-page', label: 'tool-width-page' },
        { value: 'tool-config-to-lib', label: 'tool-config-to-lib' },
        { value: 'tool-dom', label: 'tool-dom' },
        { value: 'tool-exchange', label: 'tool-exchange' },
        { value: 'tool-page', label: 'tool-page' },
        { value: 'tool-screen', label: 'tool-screen' },
    ];

    selectedLib = 'tool-width-page';

    private destroy$ = new Subject<void>();

    constructor(private router: Router, private lib: ToolConfigToLibAng15Service) {}

    ngOnInit(): void {
        this.router.events.pipe(
            filter((e): e is NavigationEnd => e instanceof NavigationEnd),
            map(e => e.urlAfterRedirects.split('/')[1] || ''),
            takeUntil(this.destroy$),
        ).subscribe(seg => {
            if (seg) this.selectedLib = seg;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onLibChange(value: string): void {
        this.selectedLib = value;
        this.router.navigate([`/${value}`]);
    }
}
