// dynamic-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormState } from 'tool-dynamic-form-ang15';
import { IFieldModel } from 'tool-dynamic-form-ang15';

import { ContactForm, DemoForm } from './contact-form.interface';


@Component({
	selector: 'app-dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
	public user = {
		id: 'string',
		login: 'логин',
		firstName: 'Василий',
		middleName: 'Иванович',
		lastName: 'Алибабаев',
		externalId: 'externalId',
		postExternal: 'postExternal',
		roleId: 'roleId',
		birthday: '11/19/2026',
		male: 'true',
		passportNumber: '123456789',
		passportDateIssue: '11/19/2026',
		passportPlaceIssue: 'Саранск',
		passportSubdivisionCode: '033',
		status: 'status',
		lockDate: '11/19/2026',
		creationDate: '11/19/2026',
		password: 'password',
		email: 'kvg@gmail.ru',
		placeOfBirth: 'placeOfBirth',
		additionalPermissions: 'additionalPermissions',
	}
	public passportForm!: FormGroup;
	public formState: FormState = { submitted: false };
	public fields: Array<IFieldModel> = [];


	// Основная форма
	demoForm!: FormGroup<DemoForm>;

	constructor(
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.initFields();

		// Собираем контролы только для полей с заданным fieldName.
		// Явный type guard (if (!field.fieldName) continue) сужает тип string | undefined -> string,
		// что снимает ошибку TS2538 при strict: true.
		const controls: Record<string, FormControl> = {};
		for (const field of this.fields) {
			if (!field.fieldName) {
				continue;
			}
			controls[field.fieldName] = field.control;
		}
		this.passportForm = new FormGroup(controls);

		/** ----------------------------------------------------------------------------------------------------------*/

		// Инициализация формы с одним предзаполненным контактом
		this.demoForm = this.fb.group<DemoForm>({
			title: this.fb.control('Список контактов', { nonNullable: true }),
			contacts: this.fb.array<FormGroup<ContactForm>>([])
		});

		// Добавляем один контакт для примера
		this.addContact();
	}

	// Геттер для удобного доступа к массиву в шаблоне
	get contacts(): FormArray<FormGroup<ContactForm>> {
		return this.demoForm.controls.contacts;
	}

	// Метод добавления нового контакта
	addContact(): void {
		const contactGroup = this.fb.group<ContactForm>({
			name: this.fb.control('', { validators: [Validators.required] }),
			email: this.fb.control('', { validators: [Validators.required, Validators.email] })
		});
		this.contacts.push(contactGroup);
	}

	// Метод удаления контакта по индексу
	removeContact(index: number): void {
		console.log('index', index)
		if (this.contacts.length > 1) { // Оставляем хотя бы один, опционально
			this.contacts.removeAt(index);
		} else {
			// Можно просто очистить, если это последний
			this.contacts.at(0).reset();
		}
	}

	// Демонстрация отправки
	onSubmit(): void {
		if (this.demoForm.valid) {
			console.log('Данные формы:', this.demoForm.value);
			// Здесь будет логика отправки
		} else {
			// Помечаем все контролы как touched для отображения ошибок
			this.demoForm.markAllAsTouched();
		}
	}

	/** ----------------------------------------------------------------------------------------------------------*/
	initFields() {
		this.fields = [
			{
				control: new FormControl(''),
				fieldName: 'birthday',
				name: 'birthday',
				controlType: 'date',
				label: 'Дата рождения',
				placeholder: 'Выберите дату'
			},
			{
				control: new FormControl(this.user['male']),
				fieldName: 'male',
				name: 'male',
				classList: ['wide', 'right-space'],
				controlType: 'select',
				options: [
					{
						value: true,
						name: 'Мужской'
					},
					{
						value: false,
						name: 'Женский'
					}
				],
				label: 'Пол',
			},
			{
				control: new FormControl(this.user['passportNumber']),
				fieldName: 'passportNumber',
				name: 'passportNumber',
				controlType: 'text',
				label: 'Паспорт с/н',
			},
			{
				control: new FormControl(this.user['passportDateIssue']),
				fieldName: 'passportDateIssue',
				name: 'passportDateIssue',
				controlType: 'date',
				label: 'Дата выдачи паспорта',
				placeholder: 'Выберите дату'
			},
			{
				control: new FormControl(this.user['passportPlaceIssue']),
				fieldName: 'passportPlaceIssue',
				name: 'passportPlaceIssue',
				classList: ['wide'],
				controlType: 'text',
				label: 'Место выдачи',
			},
			{
				control: new FormControl(this.user['passportSubdivisionCode']),
				fieldName: 'passportSubdivisionCode',
				name: 'passportSubdivisionCode',
				controlType: 'text',
				label: 'Код подразделения',
			},
			{
				control: new FormControl(this.user['placeOfBirth']),
				fieldName: 'placeOfBirth',
				name: 'placeOfBirth',
				classList: ['wide'],
				controlType: 'text',
				label: 'Место рождения',
			}

		];
	}
}
