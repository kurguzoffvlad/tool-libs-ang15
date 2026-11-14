import { Component, inject } from '@angular/core';
import { TemplateRegistryService } from "tool-templates-ang15";

@Component({
	selector: 'app-templates',
	templateUrl: './templates.component.html',
	styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent {
	tpl = inject(TemplateRegistryService);
	users = [{ name: 'Иван' }, { name: 'Мария' }];
}
