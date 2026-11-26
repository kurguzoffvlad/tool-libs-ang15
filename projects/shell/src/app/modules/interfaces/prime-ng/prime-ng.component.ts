import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Reminder } from '../material/material.interfaces';
import { MaterialService } from '../material/material.service';

@Component({
	selector: 'app-prime-ng',
	templateUrl: './prime-ng.component.html',
	styleUrls: ['./prime-ng.component.scss'],
})
export class PrimeNgComponent implements OnInit {
	reminders: Reminder[] = [];
	title = '';
	date: Date | null = null;
	priority = 'средний';
	priorities = ['низкий', 'средний', 'высокий'];
	showDone = true;
	loading = true;
	view: 'list' | 'table' = 'list';

	// для PrimeNG Table
	@ViewChild('dt') dt!: Table;
	searchValue = '';
	pageSize = 5;

	constructor(
		private service: MaterialService,
		private messageService: MessageService,
		private confirmationService: ConfirmationService,
	) {}

	ngOnInit(): void {
		this.service.list$.subscribe((list) => {
			this.reminders = list;
			this.loading = false;
		});
	}

	get visible(): Reminder[] {
		return this.showDone ? this.reminders : this.reminders.filter((r) => !r.done);
	}

	get activeCount(): number {
		return this.reminders.filter((r) => !r.done).length;
	}

	add(): void {
		if (!this.title.trim()) return;
		this.service.add({ title: this.title, date: this.date, priority: this.priority });
		this.messageService.add({ severity: 'success', summary: 'Успех', detail: 'Напоминание добавлено' });
		this.title = '';
		this.date = null;
		this.priority = 'средний';
	}

	toggle(id: number): void {
		this.service.toggle(id);
	}

	remove(reminder: Reminder): void {
		this.confirmationService.confirm({
			message: `«${reminder.title}» будет удалено безвозвратно.`,
			header: 'Удалить напоминание?',
			icon: 'pi pi-exclamation-triangle',
			acceptLabel: 'Удалить',
			rejectLabel: 'Отмена',
			acceptButtonStyleClass: 'p-button-danger',
			accept: () => {
				this.service.remove(reminder.id);
				this.messageService.add({ severity: 'success', summary: 'Удалено', detail: 'Напоминание удалено' });
			},
		});
	}

	onSearch(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
		if (this.dt) {
			this.dt.filterGlobal(value, 'contains');
		}
	}

	clearSearch(): void {
		if (this.dt) {
			this.dt.filterGlobal('', 'contains');
		}
	}
}
