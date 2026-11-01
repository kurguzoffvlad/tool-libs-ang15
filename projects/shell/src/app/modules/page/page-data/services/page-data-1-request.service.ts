import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class PageData1RequestService {
	public start() {
		return { search: { search: [] }, size: 200 };
	}
}
