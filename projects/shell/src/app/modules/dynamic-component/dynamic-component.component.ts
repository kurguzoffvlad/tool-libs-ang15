import { Component, ComponentRef, ViewChild } from '@angular/core';

import { ToolDynamicComponentAng15Service, DynamicSlotDirective } from 'tool-dynamic-component-ang15';

import { MyComponent } from './my.component';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent {
	@ViewChild(DynamicSlotDirective, { static: true })
	slot!: DynamicSlotDirective;

	constructor(private dyn: ToolDynamicComponentAng15Service) {}

	open(): void {
		const ref: ComponentRef<MyComponent> =  this.dyn.create(MyComponent, this.slot.vcr, {
			inputs: { title: 'Привет' },
			// Передаем ссылку на этот конкретный компонент в метод удаления
			outputs: { closed: () => this.dyn.remove(this.slot.vcr, ref) },
			multi: true,
		});
	}
}
