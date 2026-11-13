// my.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-my',
	standalone: true,
	template: `
    <div class="card">
      <h3>{{ title }}</h3>
      <button (click)="closed.emit()">Закрыть</button>
    </div>
  `,
})
export class MyComponent {
	@Input() title = '';
	@Output() closed = new EventEmitter<void>();
}
