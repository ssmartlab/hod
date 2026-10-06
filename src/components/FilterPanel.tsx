import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters, Category, Fuel, Country, Equipment, Availability } from '../data/types';
import { allBrands, allModels } from '../data/mock';

const categories: { value: Category | ''; label: string }[] = [
  { value: '', label: 'Все типы' },
  { value: 'engine', label: 'Двигатели' },
  { value: 'akpp', label: 'АКПП' },
  { value: 'mkpp', label: 'МКПП' },
];

const fuels: { value: Fuel | ''; label: string }[] = [
  { value: '', label: 'Любое' },
  { value: 'petrol', label: 'Бензин' },
  { value: 'diesel', label: 'Дизель' },
  { value: 'hybrid', label: 'Гибрид' },
];

const countries: { value: Country | ''; label: string }[] = [
  { value: '', label: 'Все страны' },
  { value: 'japan', label: 'Япония' },
  { value: 'europe', label: 'Европа' },
  { value: 'korea', label: 'Корея' },
];

const equipments: { value: Equipment | ''; label: string }[] = [
  { value: '', label: 'Любая' },
  { value: 'full', label: 'С навесным' },
  { value: 'bare', label: 'Голый' },
];

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function FilterPanel({ filters, onChange, resultCount, mobileOpen, onMobileClose }: Props) {
  const [searchParams] = useSearchParams();
  const [engineCodeInput, setEngineCodeInput] = useState(filters.engineCode || '');

  const models = useMemo(() => {
    if (filters.brand && allModels[filters.brand]) {
      return allModels[filters.brand];
    }
    return [];
  }, [filters.brand]);

  const updateFilter = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    if (key === 'brand') {
      newFilters.model = undefined;
    }
    onChange(newFilters);
  };

  const resetAll = () => {
    onChange({});
    setEngineCodeInput('');
  };

  const activeCount = Object.values(filters).filter(v => v !== undefined && v !== '').length;

  const content = (
    <div className="space-y-5">
      {/* Result count */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">
          Найдено: <span className="text-primary font-bold">{resultCount}</span>
        </span>
        {activeCount > 0 && (
          <button onClick={resetAll} className="text-xs text-primary hover:text-primary-dark font-medium">
            Сбросить всё
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Поиск по коду / артикулу</label>
        <input
          type="text"
          value={engineCodeInput}
          onChange={(e) => setEngineCodeInput(e.target.value)}
          onBlur={() => updateFilter('engineCode', engineCodeInput)}
          onKeyDown={(e) => e.key === 'Enter' && updateFilter('engineCode', engineCodeInput)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          placeholder="2AZ-FE, 012345..."
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Тип агрегата</label>
        <select
          value={filters.category || ''}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary outline-none"
        >
          {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Марка</label>
        <select
          value={filters.brand || ''}
          onChange={(e) => updateFilter('brand', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary outline-none"
        >
          <option value="">Все марки</option>
          {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      {/* Model */}
      {models.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Модель</label>
          <select
            value={filters.model || ''}
            onChange={(e) => updateFilter('model', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary outline-none"
          >
            <option value="">Все модели</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}

      {/* Year range */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Год (от — до)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="от"
            value={filters.yearFrom || ''}
            onChange={(e) => updateFilter('yearFrom', parseInt(e.target.value) || undefined)}
            className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-primary outline-none"
            min="1990"
            max="2025"
          />
          <input
            type="number"
            placeholder="до"
            value={filters.yearTo || ''}
            onChange={(e) => updateFilter('yearTo', parseInt(e.target.value) || undefined)}
            className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-primary outline-none"
            min="1990"
            max="2025"
          />
        </div>
      </div>

      {/* Fuel */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Топливо</label>
        <select
          value={filters.fuel || ''}
          onChange={(e) => updateFilter('fuel', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary outline-none"
        >
          {fuels.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>

      {/* Country */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Страна</label>
        <select
          value={filters.country || ''}
          onChange={(e) => updateFilter('country', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary outline-none"
        >
          {countries.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {/* Equipment */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Комплектация</label>
        <select
          value={filters.equipment || ''}
          onChange={(e) => updateFilter('equipment', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary outline-none"
        >
          {equipments.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
        </select>
      </div>

      {/* Price range */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Цена (₽)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="от"
            value={filters.priceFrom || ''}
            onChange={(e) => updateFilter('priceFrom', parseInt(e.target.value) || undefined)}
            className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-primary outline-none"
          />
          <input
            type="number"
            placeholder="до"
            value={filters.priceTo || ''}
            onChange={(e) => updateFilter('priceTo', parseInt(e.target.value) || undefined)}
            className="w-1/2 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:border-primary outline-none"
          />
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">Наличие</label>
        <select
          value={filters.availability || ''}
          onChange={(e) => updateFilter('availability', (e.target.value as Availability) || undefined)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary outline-none"
        >
          <option value="">Все</option>
          <option value="in_stock">В наличии</option>
          <option value="on_order">Под заказ</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-4">
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={onMobileClose} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Фильтры</h2>
              <button onClick={onMobileClose} className="p-2 text-slate-500 hover:text-slate-700" aria-label="Закрыть">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l8 8M6 14l8-8" />
                </svg>
              </button>
            </div>
            {content}
            <button
              onClick={onMobileClose}
              className="mt-5 w-full bg-primary text-white py-3 rounded-lg font-medium text-sm"
            >
              Показать {resultCount} результатов
            </button>
          </div>
        </div>
      )}
    </>
  );
}
