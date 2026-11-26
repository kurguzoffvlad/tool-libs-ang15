// material.model.ts — модель данных напоминания

export interface Reminder {
	id: number;              // уникальный идентификатор
	title: string;           // текст напоминания
	date: Date | null;       // дата и время напоминания
	priority: string;        // приоритет: 'низкий' | 'средний' | 'высокий'
	done: boolean;           // выполнено или нет
}
