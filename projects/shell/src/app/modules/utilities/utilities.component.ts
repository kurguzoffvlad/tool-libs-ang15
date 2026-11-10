import { Component, inject } from '@angular/core';
import { AwaitTryCatchService } from 'tool-utilities';

interface IDemoResult {
	label: string;
	from: string;
	errorMessage: string;
	status: 'ok' | 'fail';
	value: unknown;
}

@Component({
	selector: 'app-utilities',
	templateUrl: './utilities.component.html',
	styleUrls: [ './utilities.component.scss' ]
})
export class UtilitiesComponent {
	private readonly awaitTryCatch = inject(AwaitTryCatchService);

	public resultsOk: IDemoResult[] = [];
	public resultsFail: IDemoResult[] = [];

	public loadingOk = false;
	public loadingFail = false;

	public async runFetchOk(): Promise<void> {
		const from = 'UtilitiesComponent.runFetchOk';
		const errorMessage = 'Ошибка запроса todo #1 (сеть/CORS/сервер)';
		const label = `fetch 200 #${this.resultsOk.length + 1}`;

		this.loadingOk = true;

		const value = await this.awaitTryCatch.send(
			fetch('https://jsonplaceholder.typicode.com/todos/1'),
			from,
			errorMessage,
		);

		this.resultsOk = [
			...this.resultsOk,
			{ label, from, errorMessage, status: 'ok', value },
		];

		this.loadingOk = false;
	}

	public async runFetch404(): Promise<void> {
		const from = 'UtilitiesComponent.runFetch404';
		const errorMessage = 'Ошибка запроса todo #999999 (сеть/CORS/сервер)';
		const label = `fetch 404 #${this.resultsFail.length + 1}`;

		this.loadingFail = true;

		const value = await this.awaitTryCatch.send(
			fetch('https://jsonplaceholder.typicode.com/todos/999999'),
			from,
			errorMessage,
		);

		this.resultsFail = [
			...this.resultsFail,
			{ label, from, errorMessage, status: 'fail', value },
		];

		this.loadingFail = false;
	}

	public clearOk(): void {
		this.resultsOk = [];
	}

	public clearFail(): void {
		this.resultsFail = [];
	}
}
