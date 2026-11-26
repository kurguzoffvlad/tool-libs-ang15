// material.module.ts — отдельный модуль напоминалки

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';          // ngModel для формы

// ---------- Angular Material: какой модуль за что отвечает ----------
import { MatToolbarModule }   from '@angular/material/toolbar';      // шапка
import { MatCardModule }      from '@angular/material/card';         // карточки
import { MatFormFieldModule } from '@angular/material/form-field';   // обёртка полей
import { MatInputModule }     from '@angular/material/input';        // текстовое поле
import { MatDatepickerModule }  from '@angular/material/datepicker'; // календарь
import { MatNativeDateModule }  from '@angular/material/core';       // дата-адаптер
import { MatSelectModule }    from '@angular/material/select';       // выпадающий список
import { MatButtonModule }    from '@angular/material/button';       // кнопки
import { MatIconModule }      from '@angular/material/icon';         // иконки
import { MatListModule }      from '@angular/material/list';         // список
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // переключатель
import { MatChipsModule }     from '@angular/material/chips';        // теги
import { MatDividerModule }   from '@angular/material/divider';      // разделитель
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule }       from '@angular/material/table';      // таблица
import { MatSortModule }        from '@angular/material/sort';       // сортировка колонок
import { MatPaginatorModule }   from '@angular/material/paginator';  // пагинация
import { MatDialogModule }      from '@angular/material/dialog';     // модальные окна
import { MatTooltipModule }     from '@angular/material/tooltip';    // подсказки
import { MatBadgeModule }       from '@angular/material/badge';      // счётчик-метка
import { MatMenuModule }        from '@angular/material/menu';       // выпадающее меню
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // спиннер

import { MaterialComponent } from './material.component';
import { ConfirmDialogComponent } from './confirm-dialog.component';   // компонент модалки
import { MaterialRoutingModule } from "./material-routing.module";

@NgModule({
	declarations: [MaterialComponent, ConfirmDialogComponent],    // компонент модуля
	imports: [
		CommonModule, FormsModule,
		MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule,
		MatDatepickerModule, MatNativeDateModule, MatSelectModule,
		MatButtonModule, MatIconModule, MatListModule, MatSlideToggleModule,
		MatChipsModule, MatDividerModule, MatSnackBarModule, MatTableModule, MatSortModule,
		MatPaginatorModule, MatDialogModule, MatTooltipModule, MatBadgeModule, MatMenuModule,
		MatProgressSpinnerModule, MaterialRoutingModule,
	],
	exports: [MaterialComponent, ConfirmDialogComponent]          // чтобы тег <app-material> работал вне модуля
})
export class MaterialModule {}
