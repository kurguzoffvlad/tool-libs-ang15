import { Injectable } from '@angular/core';

export interface IPageDataRequestConfig {
	url: string;
	params?: Record<string, string | number>;
}

@Injectable({
	providedIn: 'root'
})
export class PageData1RequestService {
	public start(): IPageDataRequestConfig {
		return {
			url: 'assets/mock-posts.json',
			params: { _limit: 10 } // Ограничим до 10 записей для наглядности
		};
	}
}
