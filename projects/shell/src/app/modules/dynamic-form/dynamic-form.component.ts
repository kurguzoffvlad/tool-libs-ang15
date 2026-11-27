// dynamic-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactForm, DemoForm } from './contact-form.interface';

@Component({
	selector: 'app-dynamic-form',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
	// Основная форма
	demoForm!: FormGroup<DemoForm>;

	constructor(
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
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
}
