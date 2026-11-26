import { Component, OnInit } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { Reminder } from '../material/material.interfaces';   // путь поправьте под свою структуру
import { MaterialService } from '../material/material.service';

@Component({
	selector: 'app-ng-zorro',
	templateUrl: './ng-zorro.component.html',
	styleUrls: ['./ng-zorro.component.scss'],
})
export class NgZorroComponent implements OnInit {
	reminders: Reminder[] = [];
	title = '';
	date: Date | null = null;
	priority = 'средний';
	priorities = ['низкий', 'средний', 'высокий'];
	showDone = true;
	loading = true;
	view: 'list' | 'table' = 'list';

	// таблица
	searchValue = '';
	sortColumn: string | null = null;
	sortOrder: 'ascend' | 'descend' | null = null;
	pageIndex = 1;
	pageSize = 5;
	pageSizeOptions = [5, 10, 25];

	constructor(
		private service: MaterialService,
		private message: NzMessageService,
		private modal: NzModalService,
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

	get filteredTableData(): Reminder[] {
		let data = [...this.reminders];
		if (this.searchValue.trim()) {
			const q = this.searchValue.trim().toLowerCase();
			data = data.filter((r) => r.title.toLowerCase().includes(q));
		}
		if (this.sortColumn && this.sortOrder) {
			data.sort((a, b) => {
				const av = (a as any)[this.sortColumn!];
				const bv = (b as any)[this.sortColumn!];
				if (av == null) return 1;
				if (bv == null) return -1;
				const cmp = av > bv ? 1 : av < bv ? -1 : 0;
				return this.sortOrder === 'ascend' ? cmp : -cmp;
			});
		}
		return data;
	}

	get pagedTableData(): Reminder[] {
		const start = (this.pageIndex - 1) * this.pageSize;
		return this.filteredTableData.slice(start, start + this.pageSize);
	}

	onSortChange(column: string, order: string | null): void {
		this.sortColumn = column;
		this.sortOrder = order as 'ascend' | 'descend' | null;
		this.pageIndex = 1;
	}

	onPageIndexChange(index: number): void {
		this.pageIndex = index;
	}

	onPageSizeChange(size: number): void {
		this.pageSize = size;
		this.pageIndex = 1;
	}

	onSearch(): void {
		this.pageIndex = 1;
	}

	add(): void {
		if (!this.title.trim()) return;
		this.service.add({ title: this.title, date: this.date, priority: this.priority });
		this.message.success('Напоминание добавлено');
		this.title = '';
		this.date = null;
		this.priority = 'средний';
	}

	toggle(id: number): void {
		this.service.toggle(id);
	}

	remove(reminder: Reminder): void {
		this.modal.confirm({
			nzTitle: 'Удалить напоминание?',
			nzContent: `«${reminder.title}» будет удалено безвозвратно.`,
			nzOkText: 'Удалить',
			nzOkDanger: true,
			nzCancelText: 'Отмена',
			nzOnOk: () => {
				this.service.remove(reminder.id);
				this.message.success('Удалено');
			},
		});
	}

	onDateChange(result: Date | null): void {
		console.log('Выбрана дата:', result);
	}
}
