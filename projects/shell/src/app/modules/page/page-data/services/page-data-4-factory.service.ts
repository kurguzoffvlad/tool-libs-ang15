import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PageData4FactoryService {
	public start(parsedResult: any): any {
		const items = parsedResult.content.map((item: any) => ({
			id: item._id,
			code: item.code,
			name: item.name
		}));


		return items;
	}
}
