import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { ToolConfigToLibAng15Service } from 'tool-config-to-lib-ang15';
import { isLogLocalhost } from 'tool-log';

/**
 * Экран конфигурации: демонстрирует данные из библиотеки и калькулятор сложения.
 */
@Component({
	selector: 'app-config',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit, OnDestroy {
	/** URL API, полученный из библиотеки. */
	public apiUrl: string = '';

	/** Флаг локального окружения. */
	public isLocalhost: boolean = isLogLocalhost;

	/** Результат последнего сложения. */
	public addResult: number | null = null;

	/** Форма калькулятора. */
	public form!: FormGroup;

	/** Поток для отписки от Observable. */
	private readonly _destroy$ = new Subject<void>();

	/**
	 * @param _lib Сервис конфигурации из библиотеки.
	 * @param _fb Фабрика реактивных форм.
	 */
	constructor(
		private readonly _lib: ToolConfigToLibAng15Service,
		private readonly _fb: FormBuilder,
	) {}

	/** Инициализация данных и формы. */
	public ngOnInit(): void {
		this.apiUrl = this._lib.doSomething();
		this._lib.cfg.log('Сообщение из приложения через библиотеку');

		this.form = this._fb.group({
			a: [6, [Validators.required, Validators.pattern(/^-?\d+$/)]],
			b: [6, [Validators.required, Validators.pattern(/^-?\d+$/)]],
		});
	}

	/** Выполняет сложение через библиотеку. */
	public onAdd(): void {
		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const { a, b } = this.form.value;

		this.addResult = this._lib.cfg.add(Number(a), Number(b));
	}

	/** Отписка от потоков. */
	public ngOnDestroy(): void {
		this._destroy$.next();
		this._destroy$.complete();
	}
}
