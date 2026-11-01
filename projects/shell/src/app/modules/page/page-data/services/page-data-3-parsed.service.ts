import { Injectable } from '@angular/core';

export interface IPageDataParsedItem {
	id: number;
	userId: number;
	title: string;
	body: string;
}

export interface IPageDataParsedResult {
	content: IPageDataParsedItem[];
	total: number;
}

@Injectable({
	providedIn: 'root'
})
export class PageData3ParsedService {
	public start(serverResult: any): IPageDataParsedResult {
		// Проверяем, что сервер вернул массив
		if (!Array.isArray(serverResult)) {
			return { content: [], total: 0 };
		}

		// Парсим и защищаемся от пустых полей
		const content: IPageDataParsedItem[] = serverResult.map((item: any) => ({
			id: Number(item.id) || 0,
			userId: Number(item.userId) || 0,
			title: String(item.title || 'Без названия').trim(),
			body: String(item.body || '').trim()
		}));

		return {
			content,
			total: content.length
		};
	}
}
