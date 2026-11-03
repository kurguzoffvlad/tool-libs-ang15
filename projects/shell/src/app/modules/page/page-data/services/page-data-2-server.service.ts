import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPageDataRequestConfig } from './page-data-1-request.service';

@Injectable({
	providedIn: 'root'
})
export class PageData2ServerService {
	public constructor(private http: HttpClient) {}

	public start(config: IPageDataRequestConfig): Observable<any> {
		// Для локального файла params не нужны
		return this.http.get<any>(config.url, { params: config.params });
	}
}
