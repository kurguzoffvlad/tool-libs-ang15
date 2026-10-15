import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ToolConfigToLibAng15Service} from 'tool-config-to-lib-ang15';
import {isLogLocalhost, red} from 'tool-log';

interface LibOption {
    value: string;
    label: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    libraries: LibOption[] = [
        {value: 'tool-config-to-lib', label: 'tool-config-to-lib'},
        {value: 'tool-dom', label: 'tool-dom'},
        {value: 'tool-exchange', label: 'tool-exchange'},
        {value: 'tool-width-page', label: 'tool-width-page'},
    ];

    selectedLib = 'tool-config-to-lib';

    constructor(
        private router: Router,
        private lib: ToolConfigToLibAng15Service
    ) {
    }

    ngOnInit() {
        const str = this.lib.doSomething(); // → console: 'called'
        console.log('str', str);

        // для red нужно было отдельно импортировать в dependencies библиотеку 'tool-islocalhost'
        red('isLogLocalhost ===', isLogLocalhost);
    }

    onLibChange(value: string): void {
        this.selectedLib = value;
        this.router.navigate([`/${value}`]).then();
    }
}
