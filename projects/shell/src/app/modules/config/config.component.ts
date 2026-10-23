import { Component } from '@angular/core';
import { ToolConfigToLibAng15Service } from "tool-config-to-lib-ang15";
import { isLogLocalhost, red, green } from 'tool-log';

@Component({
	selector: 'app-config',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss']
})
export class ConfigComponent {
	public apiUrl: string;

	constructor(private lib: ToolConfigToLibAng15Service) {
		this.apiUrl = this.lib.doSomething();
		console.log('apiUrl', this.apiUrl);

		this.lib.cfg.log('Сообщение из приложения через библиотеку');
		red('isLogLocalhost ===', isLogLocalhost);

		const result = this.lib.cfg.add(6, 6);
		green('add', result);
	}
}
