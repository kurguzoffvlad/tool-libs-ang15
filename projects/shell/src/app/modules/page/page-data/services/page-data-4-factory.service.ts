import { Injectable } from '@angular/core';
import { IPageDataParsedResult } from './page-data-3-parsed.service';

export interface IPageDataViewModel {
	id: number;
	userId: number;
	title: string;
	bodyPreview: string;
	displayName: string;
}

@Injectable({
	providedIn: 'root'
})
export class PageData4FactoryService {
	public start(parsedResult: IPageDataParsedResult): IPageDataViewModel[] {
		if (!parsedResult || !parsedResult.content) {
			return [];
		}

		return parsedResult.content.map(item => ({
			id: item.id,
			userId: item.userId,
			title: item.title,
			bodyPreview: item.body.length > 50 ? item.body.substring(0, 50) + '...' : item.body,
			displayName: `[${item.id}] ${item.title}`
		}));
	}
}
