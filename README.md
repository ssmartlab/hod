# Ход Поршня — MVP фронтенд

Современный каталог контрактных б/у двигателей и КПП для компании «Ход Поршня» (Ростов-на-Дону).

## Стек

- **React 18** + TypeScript
- **Vite** — сборка
- **Tailwind CSS v4** — стили
- **React Router v7** — маршрутизация (HashRouter для SPA без серверной конфигурации)

## Запуск

```bash
npm install
npm run dev      # dev-сервер
npm run build    # продакшн-сборка
```

## Структура проекта

```
src/
├── App.tsx                  # Роутинг
├── index.css                # Токены + базовые стили
├── main.tsx                 # Точка входа
├── components/
│   ├── Header.tsx           # Липкая шапка + мобильное меню
│   ├── Footer.tsx           # Подвал с реквизитами
│   ├── ProductCard.tsx      # Карточка товара в каталоге
│   ├── FilterPanel.tsx      # Панель фильтров (десктоп + мобильный drawer)
│   └── ContactForm.tsx      # Переиспользуемая форма заявки
├── pages/
│   ├── HomePage.tsx         # Главная
│   ├── CatalogPage.tsx      # Каталог с фильтрами
│   ├── ProductPage.tsx      # Карточка товара
│   ├── AboutPage.tsx        # О компании
│   ├── DeliveryPage.tsx     # Оплата и доставка
│   ├── ContactsPage.tsx     # Контакты
│   ├── PrivacyPage.tsx      # Политика ПДн
│   └── NotFoundPage.tsx     # 404
├── data/
│   ├── types.ts             # Контракт данных (Product, Filters)
│   └── mock.ts              # Моковые данные (48 позиций)
└── utils/
    └── format.ts            # Форматирование цен, пробега, лейблов
```

## Дизайн-токены

| Токен | Значение | Назначение |
|-------|----------|-----------|
| `--color-primary` | `#1e40af` | CTA, ссылки, акценты |
| `--color-primary-dark` | `#1e3a8a` | Hover CTA |
| `--color-accent` | `#f59e0b` | Бейджи, рейтинги |
| `--color-surface` | `#ffffff` | Фон |
| `--color-surface-alt` | `#f8fafc` | Альтернативный фон |
| `--color-text` | `#1e293b` | Основной текст |
| `--color-text-secondary` | `#64748b` | Вторичный текст |
| `--font-sans` | Inter | Основной шрифт (кириллица) |

Радиусы: `rounded-lg` (8px), `rounded-xl` (12px).
Тени: `shadow-sm` (карточки), `shadow-lg` (hover).

## Контракт данных

```typescript
interface Product {
  id: string;
  sku: string;
  category: 'engine' | 'akpp' | 'mkpp' | 'other';
  brand: string;
  model: string;
  generation?: string;
  year: number;
  engine_code?: string;
  volume: string;
  fuel: 'petrol' | 'diesel' | 'hybrid';
  power?: number;
  transmission?: string;
  mileage: number;
  country: 'japan' | 'europe' | 'korea';
  equipment: 'full' | 'bare';
  price: number | null;  // null = "Узнать цену"
  currency: string;
  availability: 'in_stock' | 'on_order';
  photos: string[];
  video?: string;
  description: string;
  created_at: string;
}
```

## Подключение реального источника данных

1. Заменить `src/data/mock.ts` на адаптер к API:

```typescript
// src/data/adapter.ts
export async function fetchProducts(filters: Filters): Promise<Product[]> {
  const response = await fetch('/api/products?' + new URLSearchParams(filters));
  const data = await response.json();
  return data.map(normalizeProduct); // нормализация к контракту
}
```

2. В `CatalogPage.tsx` заменить `mockProducts` на вызов адаптера через `useEffect`.

3. Эндпоинт отправки формы — заменить `setTimeout` в `ContactForm.tsx` на реальный `fetch`.

## Принятые допущения

- Данные — моки по контракту (реальный API не доступен)
- Цены: два режима — конкретная цена и «Узнать цену» (price: null)
- Цвета подобраны под сине-белую палитру (надёжный, технический тон)
- HashRouter вместо BrowserRouter — для работы без серверной конфигурации
- Пагинация «Показать ещё» — для UX на мобильных и простоты
- Телефон: +7 (863) 200-00-00 — плейсхолдер (заменить на реальный)
- Адрес: г. Ростов-на-Дону — без точного адреса (плейсхолдер)
- Отзывы — примерные, без реальных данных клиентов

## Яндекс.Метрика

Счётчики: 90695485 и 103877736.

Цели:
- `form_submit` — отправка формы
- `phone_click` — клик по телефону
- `order_click` — клик «Заказать»

Код отправки целей встроен в ContactForm и ProductPage.
Скрипт Метрики нужно добавить в index.html (не включён в MVP).

## SEO

- Один `<h1>` на каждой странице
- Title и description на главной
- Семантическая разметка (nav, main, header, footer)
- Alt у изображений
- Breadcrumbs с микроразметкой
- JSON-LD Product на карточке товара

## Что не реализовано в MVP (для следующих итераций)

- [ ] Серверный рендеринг (SSR) для SEO
- [ ] Sitemap.xml и robots.xml
- [ ] Реальные 301-редиректы со старых URL
- [ ] Интеграция с реальным API
- [ ] Реальная Яндекс.Метрика (скрипт в index.html)
- [ ] Оптимизация изображений (WebP/AVIF, srcset)
- [ ] Свайп галереи на мобильных (touch events)
- [ ] Автдополнение поиска по коду двигателя
- [ ] Страницы брендов и моделей (ЧПУ)
- [ ] A/B тестирование
