# tool-libs-ang15

Демонстрационное **Angular 15**-приложение, которое показывает совместное использование набора внутренних библиотек `tool-*-ang15`: передачу конфигурации в библиотеку, работу с DOM, динамическое создание компонентов, обмен сообщениями между компонентами, определение параметров экрана, темизацию, реестр шаблонов, безопасную работу с промисами и генерацию страниц.

Приложение выступает «потребителем» библиотек: каждая библиотека подключается в `AppModule` (или через standalone-провайдеры), а сервисы/компоненты библиотек используются внутри страниц приложения.

---

## Содержание

- [Установка и запуск](#установка-и-запуск)
- [Требования](#требования)
- [Используемые библиотеки](#используемые-библиотеки)
- [Структура проекта](#структура-проекта)
- [Подключение библиотек в AppModule](#подключение-библиотек-в-appmodule)
- [Передача конфигурации в библиотеку](#передача-конфигурации-в-библиотеку)
- [Корневой шаблон](#корневой-шаблон)
- [Использование библиотек по страницам](#использование-библиотек-по-страницам)
	- [DOM Playground](#dom-playground)
	- [Динамические компоненты](#динамические-компоненты)
	- [Обмен между компонентами (Exchange)](#обмен-между-компонентами-exchange)
	- [Экран и темы (Screen)](#экран-и-темы-screen)
	- [Шаблоны (Templates)](#шаблоны-templates)
	- [Безопасные запросы (Utilities)](#безопасные-запросы-utilities)
- [Генерация страниц (tool-page-ang15)](#генерация-страниц-tool-page-ang15)
- [Сниппеты IDE](#сниппеты-ide)
- [Сборка и публикация](#сборка-и-публикация)

---

## Установка и запуск

```bash
npm install
ng serve
```

Приложение будет доступно по адресу `http://localhost:4200`.

Для production-сборки:

```bash
ng build
```

Артефакты попадут в `dist/`.

---

## Требования

- **Angular** 15.2+
- **Node.js** (нужен для генератора страниц `tool-page-ang15` и установки сниппетов)
- **`tool-log`** ^0.0.18 (peer-зависимость для `tool-exchange-ang15` и `tool-utilities-ang15`)

---

## Используемые библиотеки

| Пакет | Назначение |
|-------|-----------|
| `tool-config-to-lib-ang15` | Передача конфигурации из приложения внутрь библиотеки через `InjectionToken` + `forRoot(config)` |
| `tool-dom-ang15` | Песочница для манипуляций DOM: `DomElement`, `DomClass`, `DomStyle` |
| `tool-dynamic-component-ang15` | Динамическое создание компонентов через `ViewContainerRef.createComponent()` |
| `tool-exchange-ang15` | Обмен методами и свойствами между компонентами (`ExchangeLighthouse`, `ExchangeSubscribeComponent`) |
| `tool-page-ang15` | Node-генератор страниц/компонентов с авторегистрацией в `*.module.ts` |
| `tool-screen-ang15` | Определение типа устройства, ориентации, ОС, браузера + темизация (`ThemeModule`) |
| `tool-templates-ang15` | Реестр переиспользуемых `ng-template` (`TemplateRegistryService`) |
| `tool-utilities-ang15` | Безопасное выполнение Promise/Observable без проброса исключений (`AwaitTryCatchService`) |
| `tool-snippets` | Сниппеты для WebStorm и VS Code |

---

## Структура проекта

```
src/app/
├── app.module.ts
├── app.component.ts | .html | .scss
├── tool-config-to-lib.config.ts       # конфиг для библиотеки
├── pages/                              # страницы, сгенерированные tool-page-ang15
│   ├── page-exchange1/
│   ├── page-detail1/
│   └── page-data1/
└── ...
```

---

## Подключение библиотек в AppModule

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolConfigToLibAng15Module } from 'tool-config-to-lib-ang15';
import { ToolDynamicComponentAng15Module } from 'tool-dynamic-component-ang15';
import { ToolExchangeAng15Module } from 'tool-exchange-ang15';
import { ToolTemplatesAng15Module } from 'tool-templates-ang15';
import { ThemeModule, provideToolScreenConfig } from 'tool-screen-ang15';
import { AppComponent } from './app.component';
import { configFromApp } from './tool-config-to-lib.config';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // Конфиг передаётся один раз — в корневом модуле
    ToolConfigToLibAng15Module.forRoot(configFromApp),
    ToolDynamicComponentAng15Module,
    ToolExchangeAng15Module,
    ToolTemplatesAng15Module,
    ThemeModule,
  ],
  providers: [
    // Регистрация конфигурации ToolScreenService
    provideToolScreenConfig({
      devices: { phoneMaxSize: 900 },
      resizeDebounceMs: 100,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

> `forRoot(config)` у `ToolConfigToLibAng15Module` вызывается **только один раз** — в `AppModule`. Для лениво загружаемых модулей используйте обычный импорт без `forRoot`.

---

## Передача конфигурации в библиотеку

Приложение описывает объект `IConfigToLib` и передаёт его в `forRoot`:

```ts
// tool-config-to-lib.config.ts
import { IConfigToLib } from 'tool-config-to-lib-ang15';

export const configFromApp: IConfigToLib = {
  apiUrl: 'https://api.example.com',
  log: (m: any) => console.log('!!! Из приложения конфиг - ', m),
};
```

Любой сервис или компонент библиотеки получает этот конфиг через DI по токену `LIB_CONFIG`:

```ts
constructor(private lib: ToolConfigToLibAng15Service) {
  const url = this.lib.doSomething(); // 'https://api.example.com'
}
```

---

## Корневой шаблон

```html
<!-- app.component.html -->

<!-- Реестр шаблонов: обязательно до router-outlet -->
<lib-tool-templates-ang15 />

<!-- Пример компонента библиотеки конфигурации -->
<lib-tool-config-to-lib-ang15></lib-tool-config-to-lib-ang15>

<!-- Страницы приложения -->
<router-outlet />
```

> Компонент `ToolTemplatesAng15Component` должен быть отрендерен **до** `<router-outlet>`, иначе его `ngAfterViewInit` не выполнится и шаблоны не попадут в реестр.

---

## Использование библиотек по страницам

### DOM Playground

Страница с интерактивной песочницей `tool-dom-ang15`. Позволяет вручную вызывать методы `DomElement`, `DomClass`, `DomStyle` и наблюдать результат в логе.

```html
<lib-tool-dom-ang15></lib-tool-dom-ang15>
```

Демонстрирует:
- создание/вставку/удаление элементов;
- управление CSS-классами (включая генерацию утилит `evo-*` для `margin/padding`);
- работу с инлайн-стилями.

### Динамические компоненты

Пример страницы, где через `dynSlot` и `ToolDynamicComponentAng15Service` создаётся компонент `UserCardComponent`.

```ts
@Component({
  selector: 'app-dynamic-demo',
  templateUrl: './dynamic-demo.component.html',
})
export class DynamicDemoComponent {
  @ViewChild(DynamicSlotDirective, { static: true })
  slot!: DynamicSlotDirective;

  private dyn = inject(ToolDynamicComponentAng15Service);

  ngOnInit(): void {
    for (const user of this.users) {
      this.dyn.create(UserCardComponent, this.slot.vcr, {
        inputs: { name: user.name },
        outputs: { clicked: (id) => console.log('clicked', id) },
        multi: true,
      });
    }
  }
}
```

```html
<ng-container dynSlot></ng-container>
```

### Обмен между компонентами (Exchange)

Демонстрирует передачу свойства и вызов метода между двумя компонентами через `ExchangeLighthouse`.

```ts
// page-exchange1.component.ts
@Component({ ... })
export class PageExchange1Component
  extends ExchangeSubscribeComponent
  implements OnDestroy {

  static readonly extendsClassName = 'PageExchange1Component';

  exch_title = '';

  constructor(exchange: ExchangeLighthouse) {
    super(PageExchange1Component.extendsClassName, exchange);
  }

  exch_doSomething(a: number, b: number): void {
    console.log(a, b);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
```

Отправка из другого места:

```ts
this.exchange.send$({
  from: 'AppComponent',
  to: 'PageExchange1Component',
  source: {
    name: exchangeNameEnum.ChangeProperty,
    data: { name: 'exch_title', value: 'Новый заголовок' },
  },
}, 'AppComponent');
```

> Имена свойств и методов должны начинаться с `exch_`. В dev-режиме нарушения выбрасывают исключения.

### Экран и темы (Screen)

На страницах используется `ToolScreenService` для адаптивной вёрстки и `ThemeClassDirective` — для темизации.

```ts
@Component({ ... })
export class LayoutComponent {
  public readonly screen = inject(ToolScreenService);

  changeTheme(theme: 'dark' | 'white'): void {
    inject(ThemeLighthouse).send$({ name: theme }, 'LayoutComponent');
  }
}
```

```html
<div
  class="tool-wrapper"
  [themeClass]="['license-widget', 'card']">
  <p>type: {{ screen.state.screen.type }}</p>
  <p>orientation: {{ screen.state.screen.orientation }}</p>
</div>
```

CSS-переменная `--tool-page-width` управляется сервисом и применяется к обёртке:

```scss
.tool-wrapper {
  width: var(--tool-page-width, 100%);
}
```

### Шаблоны (Templates)

Использование готовых шаблонов из `tool-templates-ang15` через `TemplateRegistryService`.

```ts
export class OrdersComponent {
  tpl = inject(TemplateRegistryService);
  users = [{ name: 'Иван' }, { name: 'Мария' }];
}
```

```html
<ng-container *ngFor="let u of users">
  <ng-container
    *ngTemplateOutlet="tpl.get('userCard'); context: { $implicit: u }">
  </ng-container>
</ng-container>
```

Доступные ключи: `userCard`, `emptyState`, `loading`.

### Безопасные запросы (Utilities)

Примеры использования `AwaitTryCatchService` для запросов без `try/catch`:

```ts
const todos = await this.awaitTryCatch.send(
  fetch('https://jsonplaceholder.typicode.com/todos/1'),
  'OrdersComponent.load'
); // false при ошибке

const results = await this.awaitTryCatch.sendAllSettled(
  urls.map(u => fetch(u)),
  'Reports.load',
  'text'
);
```

---

## Генерация страниц (`tool-page-ang15`)

Генератор создаёт страницу/компонент и автоматически регистрирует его в ближайшем `*.module.ts`.

```bash
# Компонент обмена
npm run CREATE:page page-exchange -- --name page-exchange1

# Страница детализации (стиль less, свой путь)
npm run CREATE:page page-detail -- --name page-detail1 --style less --path src/app/pages

# Страница списка
npm run CREATE:page page-data -- --name page-data1
```

| Параметр | Обязателен | По умолчанию |
|----------|------------|--------------|
| `--name` | да (kebab-case) | — |
| `--style` | нет | `scss` |
| `--path` | нет | текущая папка |

Перед запуском убедитесь, что генератор собран:

```bash
ng build tool-page-ang15
```

---

## Сниппеты IDE

```bash
# WebStorm
npm run SNIPPETS:webstorm

# VS Code
npm run SNIPPETS:vscode
```

После установки перезапустите IDE. Схема префиксов: `tool-<группа>-<действие>` (`tool-hook-onInit`, `tool-ng-viewChild`, `tool-width-css`, `tool-theme-send` и т.д.).

---

## Сборка и публикация

```bash
# Сборка приложения
ng build

# Сборка отдельной библиотеки (для публикации)
ng build tool-dynamic-component-ang15
cd dist/tool-dynamic-component-ang15
npm publish
```
