import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Динамически создаваемый компонент-карточка.
 * Создаётся через `ToolDynamicComponentAng15Service` в слот `DynamicSlotDirective`.
 */
@Component({
	selector: 'app-my',
	standalone: true,
	templateUrl: './my.component.html',
	styleUrls: ['./my.component.scss'],
})
export class MyComponent {
	/** Заголовок карточки. */
	@Input() public title: string = '';

	/** Событие закрытия карточки. */
	@Output() public closed: EventEmitter<void> = new EventEmitter<void>();
}
