Соглашения (конвенции) в Angular — это набор правил и лучших практик, которые помогают писать чистый, понятный и поддерживаемый код. Они охватывают не только имена файлов, но и структуру кода, архитектуру и стиль программирования.

Вот основные категории соглашений Angular:

## 1. Соглашения об именовании файлов (File Naming)

| Тип файла | Префикс/Суффикс | Пример |
|-----------|-----------------|--------|
| Компонент | `*.component.ts` | `user-list.component.ts` |
| Шаблон компонента | `*.component.html` | `user-list.component.html` |
| Стили компонента | `*.component.css/scss` | `user-list.component.scss` |
| Сервис | `*.service.ts` | `auth.service.ts` |
| Модуль | `*.module.ts` | `admin.module.ts` |
| Маршрутизация | `*-routing.module.ts` | `admin-routing.module.ts` |
| Директива | `*.directive.ts` | `highlight.directive.ts` |
| Пайп | `*.pipe.ts` | `date-format.pipe.ts` |
| Интерфейс | `*.model.ts` или `*.interface.ts` | `user.model.ts` |
| Guard | `*.guard.ts` | `auth.guard.ts` |
| Resolver | `*.resolver.ts` | `user-data.resolver.ts` |

## 2. Соглашения об именовании классов и селекторов

### Компоненты
```typescript
// ❌ Плохо
@Component({
  selector: 'app-userlist',  // слитно
})
export class UserListComponent { }

// ✅ Хорошо
@Component({
  selector: 'app-user-list',  // kebab-case
})
export class UserListComponent { }  // PascalCase для класса
```

**Правила:**
- **Класс**: `PascalCase` + суффикс типа (`Component`, `Service`, etc.)
- **Селектор**: `kebab-case` с префиксом приложения (обычно `app-`)
- **Имя файла**: `kebab-case` + тип

### Сервисы
```typescript
// ✅ Хорошо
@Injectable({ providedIn: 'root' })
export class AuthService { }  // Файл: auth.service.ts
```

## 3. Структурные соглашения

### Организация модулей
```
src/app/
├── core/                    # Singleton сервисы, guards, interceptors
│   ├── services/
│   ├── guards/
│   ├── interceptors/
│   └── core.module.ts
├── shared/                  # Переиспользуемые компоненты, пайпы, директивы
│   ├── components/
│   ├── pipes/
│   ├── directives/
│   └── shared.module.ts
├── features/                # Функциональные модули
│   ├── users/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   └── users.module.ts
│   └── products/
├── app-routing.module.ts
├── app.module.ts
└── app.component.ts
```

## 4. Соглашения по коду

### TypeScript типы
```typescript
// ✅ Использовать интерфейсы для данных
export interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Использовать type для объединений
export type Status = 'active' | 'inactive' | 'pending';
```

### Обработка подписок
```typescript
// ✅ Использовать async pipe в шаблонах вместо ручной подписки
// component.ts
users$ = this.userService.getUsers();

// component.html
<div *ngFor="let user of users$ | async">{{ user.name }}</div>
```

### Dependency Injection
```typescript
// ✅ Предпочитать providedIn: 'root' для singleton сервисов
@Injectable({ providedIn: 'root' })
export class AuthService { }

// ✅ Использовать constructor injection
constructor(private authService: AuthService) { }
```

## 5. Соглашения по стилю (Style Guide)

Основано на [официальном Angular Style Guide](https://angular.io/guide/styleguide):

### Порядок элементов в компоненте
```typescript
@Component({...})
export class ExampleComponent implements OnInit, OnDestroy {
  // 1. Inputs
  @Input() title: string;
  
  // 2. Outputs
  @Output() save = new EventEmitter<void>();
  
  // 3. Public properties
  isLoading = false;
  
  // 4. Private properties
  private subscription: Subscription;
  
  // 5. Constructor
  constructor(private service: DataService) { }
  
  // 6. Lifecycle hooks
  ngOnInit() { }
  ngOnDestroy() { }
  
  // 7. Public methods
  saveData() { }
  
  // 8. Private methods
  private handleError() { }
}
```

## 6. Соглашения по маршрутизации

```typescript
// ✅ Использовать lazy loading для feature модулей
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module')
      .then(m => m.UsersModule)
  }
];
```

## 7. Соглашения по тестированию

```typescript
// Имена тестовых файлов
// user.service.spec.ts
// user-list.component.spec.ts

// ✅ Описательные названия тестов
it('should return active users when filter is applied', () => {
  // ...
});
```

## 8. Pre-commit и линтинг

Angular проекты обычно используют:
- **ESLint** для проверки стиля кода
- **Prettier** для форматирования
- **Husky** для pre-commit хуков

```json
// .eslintrc.json
{
  "rules": {
    "@angular-eslint/component-selector": ["error", {
      "type": "element",
      "prefix": "app",
      "style": "kebab-case"
    }]
  }
}
```

## 9. Соглашения для Standalone Components (Angular 14+)

```typescript
// ✅ Standalone компонент
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-user-card',
  template: `...`
})
export class UserCardComponent { }

// ✅ Роутинг без модулей
export const routes: Routes = [
  { path: '', component: HomeComponent }
];
```

## Почему эти соглашения важны?

1. **Единый стиль** в команде
2. **Легкость поиска** файлов по имени
3. **Автоматизация** через Angular CLI
4. **Масштабируемость** проекта
5. **Onboarding** новых разработчиков

Эти соглашения не являются жесткими правилами языка, но их соблюдение значительно улучшает качество и поддерживаемость Angular-приложений! 🚀
