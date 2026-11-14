import { Component, inject } from '@angular/core';
import { delay, of, throwError } from 'rxjs';
import { AwaitTryCatchService, ResponseMode } from 'tool-utilities';

type DemoStatus = 'ok' | 'fail';

interface IDemoResult {
	label: string;
	from: string;
	errorMessage: string;
	status: DemoStatus;
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
	public loadingObs = false;
	public loadingTimeout = false;
	public loadingAll = false;
	public loadingMode = false;

	/** Добавляет результат в нужную колонку по статусу. */
	private push(status: DemoStatus, item: IDemoResult): void {
		if (status === 'ok') {
			this.resultsOk = [ ...this.resultsOk, item ];
		} else {
			this.resultsFail = [ ...this.resultsFail, item ];
		}
	}

	// ---------- send: fetch 200 ----------

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

		this.push(value === false ? 'fail' : 'ok', {
			label, from, errorMessage, status: value === false ? 'fail' : 'ok', value
		});

		this.loadingOk = false;
	}

	// ---------- send: fetch 404 ----------

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

		this.push('fail', {
			label, from, errorMessage, status: 'fail', value
		});

		this.loadingFail = false;
	}

	// ---------- send с разными ResponseMode ----------

	public async runModes(): Promise<void> {
		const from = 'UtilitiesComponent.runModes';
		const errorMessage = 'Ошибка запроса /todos/1 с разными режимами';
		const modes: ResponseMode[] = [ 'json', 'text', 'blob', 'arrayBuffer', 'formData' ];

		this.loadingMode = true;

		for (const mode of modes) {
			const label = `mode=${mode}`;
			const value = await this.awaitTryCatch.send(
				fetch('https://jsonplaceholder.typicode.com/todos/1'),
				from,
				errorMessage,
				mode
			);

			// Blob/ArrayBuffer/FormData не сериализуются в JSON — показываем краткую сводку
			let display: unknown = value;
			if (value instanceof Blob) {
				display = { mode, type: value.type, size: value.size };
			} else if (value instanceof ArrayBuffer) {
				display = { mode, byteLength: value.byteLength };
			} else if (typeof FormData !== 'undefined' && value instanceof FormData) {
				display = { mode, entries: Array.from((value as FormData).keys()) };
			}

			this.push(value === false ? 'fail' : 'ok', {
				label, from, errorMessage, status: value === false ? 'fail' : 'ok', value: display
			});
		}

		this.loadingMode = false;
	}

	// ---------- sendObservable ----------

	public async runObservableOk(): Promise<void> {
		const from = 'UtilitiesComponent.runObservableOk';
		const errorMessage = 'Ошибка Observable (успех)';
		const label = `observable ok #${this.resultsOk.length + 1}`;

		this.loadingObs = true;

		const value = await this.awaitTryCatch.sendObservable(
			of({ id: 1, title: 'demo' }).pipe(delay(300)),
			from,
			errorMessage
		);

		this.push(value === false ? 'fail' : 'ok', {
			label, from, errorMessage, status: value === false ? 'fail' : 'ok', value
		});

		this.loadingObs = false;
	}

	public async runObservableError(): Promise<void> {
		const from = 'UtilitiesComponent.runObservableError';
		const errorMessage = 'Ошибка Observable (reject)';
		const label = `observable fail #${this.resultsFail.length + 1}`;

		this.loadingObs = true;

		const value = await this.awaitTryCatch.sendObservable(
			throwError(() => new Error('boom')).pipe(delay(300)),
			from,
			errorMessage
		);

		this.push('fail', {
			label, from, errorMessage, status: 'fail', value
		});

		this.loadingObs = false;
	}

	// ---------- sendWithTimeout ----------

	public async runTimeoutOk(): Promise<void> {
		const from = 'UtilitiesComponent.runTimeoutOk';
		const errorMessage = 'Таймаут (ожидаем успех)';
		const label = `timeout ok #${this.resultsOk.length + 1}`;

		this.loadingTimeout = true;

		const value = await this.awaitTryCatch.sendWithTimeout(
			new Promise(res => setTimeout(() => res({ done: true }), 100)),
			1000,
			from
		);

		this.push(value === false ? 'fail' : 'ok', {
			label, from, errorMessage, status: value === false ? 'fail' : 'ok', value
		});

		this.loadingTimeout = false;
	}

	public async runTimeoutFail(): Promise<void> {
		const from = 'UtilitiesComponent.runTimeoutFail';
		const errorMessage = 'Таймаут 500мс (ожидаем false)';
		const label = `timeout fail #${this.resultsFail.length + 1}`;

		this.loadingTimeout = true;

		const value = await this.awaitTryCatch.sendWithTimeout(
			new Promise(res => setTimeout(() => res({ done: true }), 2000)),
			500,
			from
		);

		this.push('fail', {
			label, from, errorMessage, status: 'fail', value
		});

		this.loadingTimeout = false;
	}

	// ---------- sendAllSettled ----------

	public async runAllSettled(): Promise<void> {
		const from = 'UtilitiesComponent.runAllSettled';
		const errorMessage = 'Пакетный запрос';

		this.loadingAll = true;

		const results = await this.awaitTryCatch.sendAllSettled(
			[
				fetch('https://jsonplaceholder.typicode.com/todos/1'),
				fetch('https://jsonplaceholder.typicode.com/todos/999999'),
				fetch('https://jsonplaceholder.typicode.com/todos/3'),
			],
			from
		);

		for (const r of results) {
			const label = `allSettled [${r.index}]`;
			this.push(r.ok ? 'ok' : 'fail', {
				label,
				from,
				errorMessage,
				status: r.ok ? 'ok' : 'fail',
				value: r.ok ? r.value : { error: String(r.error) }
			});
		}

		this.loadingAll = false;
	}

	// ---------- sendAllStrict ----------

	public async runAllStrictOk(): Promise<void> {
		const from = 'UtilitiesComponent.runAllStrictOk';
		const errorMessage = 'sendAllStrict (все успешны)';
		const label = `allStrict ok #${this.resultsOk.length + 1}`;

		this.loadingAll = true;

		const value = await this.awaitTryCatch.sendAllStrict(
			[
				fetch('https://jsonplaceholder.typicode.com/todos/1'),
				fetch('https://jsonplaceholder.typicode.com/todos/2'),
			],
			from
		);

		this.push(value === false ? 'fail' : 'ok', {
			label, from, errorMessage, status: value === false ? 'fail' : 'ok', value
		});

		this.loadingAll = false;
	}

	public async runAllStrictFail(): Promise<void> {
		const from = 'UtilitiesComponent.runAllStrictFail';
		const errorMessage = 'sendAllStrict (одна 404)';
		const label = `allStrict fail #${this.resultsFail.length + 1}`;

		this.loadingAll = true;

		const value = await this.awaitTryCatch.sendAllStrict(
			[
				fetch('https://jsonplaceholder.typicode.com/todos/1'),
				fetch('https://jsonplaceholder.typicode.com/todos/999999'),
			],
			from
		);

		this.push('fail', {
			label, from, errorMessage, status: 'fail', value
		});

		this.loadingAll = false;
	}

	// ---------- очистка ----------

	public clearOk(): void {
		this.resultsOk = [];
	}

	public clearFail(): void {
		this.resultsFail = [];
	}
}
