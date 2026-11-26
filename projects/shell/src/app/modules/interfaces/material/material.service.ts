// material.service.ts — бизнес-логика и хранение напоминаний

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reminder } from './material.interfaces';

@Injectable({ providedIn: 'root' })   // сервис доступен всему приложению
export class MaterialService {

	// BehaviorSubject — поток с текущим значением; храним список напоминаний
	private reminders$ = new BehaviorSubject<Reminder[]>([]);
	// публичный наблюдаемый поток для компонента (только чтение)
	public list$ = this.reminders$.asObservable();

	private nextId = 1;      // счётчик id для новых напоминаний

	// добавляет новое напоминание в список
	add(reminder: Omit<Reminder, 'id' | 'done'>): void {
		const current = this.reminders$.value;
		this.reminders$.next([
			...current,
			{ ...reminder, id: this.nextId++, done: false }
		]);
	}

	// переключает флаг done у напоминания по id
	toggle(id: number): void {
		const updated = this.reminders$.value.map(r =>
			r.id === id ? { ...r, done: !r.done } : r
		);
		this.reminders$.next(updated);
	}

	// удаляет напоминание по id
	remove(id: number): void {
		this.reminders$.next(this.reminders$.value.filter(r => r.id !== id));
	}
}
