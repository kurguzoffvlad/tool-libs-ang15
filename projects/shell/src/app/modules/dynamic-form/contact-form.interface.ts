// contact-form.model.ts
import { FormArray, FormControl, FormGroup } from '@angular/forms';

// Тип для одного контакта
export interface ContactForm {
	name: FormControl<string | null>;
	email: FormControl<string | null>;
}

// Тип для всей формы
export interface DemoForm {
	title: FormControl<string | null>;
	contacts: FormArray<FormGroup<ContactForm>>;
}
