// material.component.ts — логика компонента напоминалки

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';            // сервис модалок
import { MatTableDataSource } from '@angular/material/table';    // данные для таблицы
import { MatSort } from '@angular/material/sort';                // сортировка
import { MatPaginator } from '@angular/material/paginator';      // пагинация

import { Reminder } from './material.interfaces';
import { MaterialService } from './material.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
	selector: 'app-material',
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit, AfterViewInit {

	reminders: Reminder[] = [];

	title = '';
	date: Date | null = null;
	priority = 'средний';
	priorities = ['низкий', 'средний', 'высокий'];
	showDone = true;

	loading = true;                    // флаг загрузки (MatProgressSpinner)
	view: 'list' | 'table' = 'list';   // текущий вид: список или таблица

	// --- MatTable: источник данных и отображаемые колонки ---
	dataSource = new MatTableDataSource<Reminder>([]);
	displayedColumns: string[] = ['title', 'date', 'priority', 'done', 'actions'];

	// --- ссылки на директивы из шаблона ---
	@ViewChild(MatSort) sort!: MatSort;              // сортировка таблицы
	@ViewChild(MatPaginator) paginator!: MatPaginator; // пагинация таблицы

	constructor(
		private service: MaterialService,
		private snackBar: MatSnackBar,
		private dialog: MatDialog,         // сервис для открытия модалок
	) {}

	ngOnInit(): void {
		this.service.list$.subscribe(list => {
			this.reminders = list;
			this.dataSource.data = list;   // обновляем и таблицу
			this.loading = false;
		});
	}

	// подключаем сортировку и пагинацию к таблице после отрисовки
	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	// фильтр по выполненным (тот же, что и раньше)
	get visible(): Reminder[] {
		return this.showDone ? this.reminders : this.reminders.filter(r => !r.done);
	}

	// количество невыполненных — для MatBadge на шапке
	get activeCount(): number {
		return this.reminders.filter(r => !r.done).length;
	}

	// фильтр таблицы по вводу (по любой колонке)
	applyFilter(event: Event): void {
		const value = (event.target as HTMLInputElement).value;
		this.dataSource.filter = value.trim().toLowerCase();
	}

	add(): void {
		if (!this.title.trim()) { return; }
		this.service.add({ title: this.title, date: this.date, priority: this.priority });
		this.snackBar.open('Напоминание добавлено', 'OK', { duration: 2000 });
		this.title = ''; this.date = null; this.priority = 'средний';
	}

	toggle(id: number): void { this.service.toggle(id); }

	// удаление теперь через модальное окно подтверждения
	remove(reminder: Reminder): void {
		const ref = this.dialog.open(ConfirmDialogComponent, {
			width: '350px',                          // ширина окна
			data: {                                  // данные в окно
				title: 'Удалить напоминание?',
				message: `«${reminder.title}» будет удалено безвозвратно.`,
			}
		});
		// ждём закрытия окна; удаляем только если подтвердили
		ref.afterClosed().subscribe(result => {
			if (result) {
				this.service.remove(reminder.id);
				this.snackBar.open('Удалено', '', { duration: 1500 });
			}
		});
	}
}
