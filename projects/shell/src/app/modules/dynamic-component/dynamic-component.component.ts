import { Component, ComponentRef, ViewChild, OnInit } from '@angular/core';
import { ToolDynamicComponentAng15Service, DynamicSlotDirective } from 'tool-dynamic-component-ang15';
import { MyComponent } from './my.component';

@Component({
	selector: 'app-dynamic-component',
	templateUrl: './dynamic-component.component.html',
	styleUrls: ['./dynamic-component.component.scss']
})
export class DynamicComponentComponent implements OnInit {
	@ViewChild(DynamicSlotDirective, { static: true })
	slot!: DynamicSlotDirective;

	constructor(private dyn: ToolDynamicComponentAng15Service) {}

	// 1. Автоматическое создание через 5 секунд после загрузки
	ngOnInit(): void {
		// setTimeout(() => {
			const ref: ComponentRef<MyComponent>  = this.dyn.create(MyComponent, this.slot.vcr, {
				inputs: { title: 'Появился сам через 5 сек' },
				outputs: { closed: () => this.dyn.remove(this.slot.vcr, ref) },
				multi: true,
			});
		// }, 5000);
	}

	// 2. Создание по клику на кнопку (без задержки)
	open(): void {
		const ref: ComponentRef<MyComponent> = this.dyn.create(MyComponent, this.slot.vcr, {
			inputs: { title: 'Создан по кнопке' },
			outputs: { closed: () => this.dyn.remove(this.slot.vcr, ref) },
			multi: true,
		});
	}
}
