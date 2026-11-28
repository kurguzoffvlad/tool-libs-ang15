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
		birthday: '2026-11-19',
		male: 'true',
		passportNumber: '123456789',
		passportDateIssue: '2026-11-19',
		passportPlaceIssue: 'Саранск',
		passportSubdivisionCode: '033',
		status: 'status',
		lockDate: '2026-11-19',
		creationDate: '2026-11-19',
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

		this.passportForm = new FormGroup(
			this.fields.reduce<Record<string, FormControl>>((group, field
			) => {

				if (field.fieldName) {
					group[field.fieldName] = field.control;
				}

				return group;
		}, {}));

		if (this.user.id !== '0') {
			this.fields.map(field => {
				if (field.fieldName === 'birthday') {
					if (!this.user['birthday']) {
						field.control.setValue(null);
					} else {
						field.control.setValue( new Date(this.user['birthday']) );
					}
				} else if (field.fieldName === 'passportDateIssue') {
					if (!this.user['passportDateIssue']) {
						field.control.setValue(null);
					}else {
						field.control.setValue( new Date(this.user['passportDateIssue']) );
					}
				}
			});
		}
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

	public initFields() {
		this.fields = [
			// 1. Текстовое поле
			{
				control: new FormControl('Мое текстовое поле'),
				fieldName: 'textField',
				name: 'textField',
				controlType: 'text',
				label: 'Текстовое поле (text)',
				placeholder: 'Введите текст'
			},
			// 2. Textarea (многострочное)
			{
				control: new FormControl('Многострочный текст\nВторая строка'),
				fieldName: 'textareaField',
				name: 'textareaField',
				classList: ['wide'], // на всю ширину
				controlType: 'textarea',
				label: 'Многострочное (textarea)',
			},
			// 3. Числовое поле
			{
				control: new FormControl(12345),
				fieldName: 'numberField',
				name: 'numberField',
				controlType: 'number',
				label: 'Число (number)',
			},
			// 4. Пароль
			{
				control: new FormControl('secret123'),
				fieldName: 'passwordField',
				name: 'passwordField',
				controlType: 'password',
				label: 'Пароль (password)',
				canShowPassword: true // если библиотека поддерживает
			},
			// 5. Email
			{
				control: new FormControl('test@example.com'),
				fieldName: 'emailField',
				name: 'emailField',
				controlType: 'email',
				label: 'Email (email)',
			},
			// 6. Чекбокс
			{
				control: new FormControl(true),
				fieldName: 'checkboxField',
				name: 'checkboxField',
				controlType: 'checkbox',
				label: 'Согласие (checkbox)',
			},
			// 7. Селект (выпадающий список)
			{
				control: new FormControl('val2'),
				fieldName: 'selectField',
				name: 'selectField',
				controlType: 'select',
				label: 'Выпадающий список (select)',
				options: [
					{ value: 'val1', name: 'Вариант 1' },
					{ value: 'val2', name: 'Вариант 2' },
					{ value: 'val3', name: 'Вариант 3' }
				]
			},
			// 8. Радио кнопки
			{
				control: new FormControl('radio1'),
				fieldName: 'radioField',
				name: 'radioField',
				controlType: 'radio',
				label: 'Радио (radio)',
				options: [
					{ value: 'radio1', name: 'Да' },
					{ value: 'radio2', name: 'Нет' }
				]
			},
			// 9. Датапикер
			{
				control: new FormControl(new Date()),
				fieldName: 'dateField',
				name: 'dateField',
				controlType: 'date',
				label: 'Дата (date)',
				placeholder: 'Выберите дату'
			},
			// 10. Группа (group)
			{
				control: new FormControl(''), // Для группы контрол не обязателен, но интерфейс требует
				fieldName: 'groupField',
				name: 'groupField',
				controlType: 'group',
				label: 'Группа (group)',
				fields: [ // Вложенные поля для группы
					{
						control: new FormControl('Вложенное поле 1'),
						fieldName: 'nested1',
						name: 'nested1',
						controlType: 'text',
						label: 'Вложенный текст'
					}
				]
			},
			// 11. Label (текстовая метка, не инпут)
			{
				control: new FormControl(''),
				fieldName: 'labelField',
				name: 'labelField',
				controlType: 'label',
				label: 'Это просто текст (label)',
			},
			// 12. Автокомплит
			{
				control: new FormControl(''),
				fieldName: 'autocompleteField',
				name: 'autocompleteField',
				controlType: 'autocomplete',
				label: 'Автокомплит (autocomplete)',
				options: [
					{ value: '1', name: 'Москва' },
					{ value: '2', name: 'Санкт-Петербург' },
					{ value: '3', name: 'Казань' }
				]
			},
			// 13. Дата и время
			{
				control: new FormControl(new Date()),
				fieldName: 'datetimeField',
				name: 'datetimeField',
				controlType: 'datetimepicker',
				label: 'Дата и время (datetimepicker)',
			}
		];
	}
}
