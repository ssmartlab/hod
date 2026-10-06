import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProducts } from '../data/mock';
import { Filters } from '../data/types';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';

const ITEMS_PER_PAGE = 12;

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('date');

  // Parse filters from URL
  const filters: Filters = useMemo(() => ({
    brand: searchParams.get('brand') || undefined,
    model: searchParams.get('model') || undefined,
    yearFrom: searchParams.get('yearFrom') ? parseInt(searchParams.get('yearFrom')!) : undefined,
    yearTo: searchParams.get('yearTo') ? parseInt(searchParams.get('yearTo')!) : undefined,
    category: (searchParams.get('category') as any) || undefined,
    fuel: (searchParams.get('fuel') as any) || undefined,
    country: (searchParams.get('country') as any) || undefined,
    equipment: (searchParams.get('equipment') as any) || undefined,
    availability: (searchParams.get('availability') as any) || undefined,
    engineCode: searchParams.get('engineCode') || undefined,
    priceFrom: searchParams.get('priceFrom') ? parseInt(searchParams.get('priceFrom')!) : undefined,
    priceTo: searchParams.get('priceTo') ? parseInt(searchParams.get('priceTo')!) : undefined,
  }), [searchParams]);

  // Update URL when filters change
  const updateFilters = (newFilters: Filters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
    setPage(1);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...mockProducts];

    if (filters.brand) result = result.filter(p => p.brand === filters.brand);
    if (filters.model) result = result.filter(p => p.model === filters.model);
    if (filters.category) result = result.filter(p => p.category === filters.category);
    if (filters.fuel) result = result.filter(p => p.fuel === filters.fuel);
    if (filters.country) result = result.filter(p => p.country === filters.country);
    if (filters.equipment) result = result.filter(p => p.equipment === filters.equipment);
    if (filters.availability) result = result.filter(p => p.availability === filters.availability);
    if (filters.yearFrom) result = result.filter(p => p.year >= filters.yearFrom!);
    if (filters.yearTo) result = result.filter(p => p.year <= filters.yearTo!);
    if (filters.priceFrom) result = result.filter(p => p.price !== null && p.price >= filters.priceFrom!);
    if (filters.priceTo) result = result.filter(p => p.price !== null && p.price <= filters.priceTo!);
    if (filters.engineCode) {
      const code = filters.engineCode.toLowerCase();
      result = result.filter(p =>
        (p.engine_code && p.engine_code.toLowerCase().includes(code)) ||
        p.sku.toLowerCase().includes(code)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'mileage_asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'year_desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'date':
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [filters, sortBy]);

  const paginatedProducts = filteredProducts.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginatedProducts.length < filteredProducts.length;

  // Active filter chips
  const activeChips = Object.entries(filters)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => ({ key: k, value: String(v) }));

  return (
    <main className="bg-surface-alt min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-slate-500 mb-4" aria-label="Хлебные крошки">
          <a href="/" className="hover:text-primary">Главная</a>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Каталог</span>
          {filters.brand && <><span className="mx-2">/</span><span className="text-slate-900">{filters.brand}</span></>}
          {filters.model && <><span className="mx-2">/</span><span className="text-slate-900">{filters.model}</span></>}
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Каталог {filters.brand && `— ${filters.brand}`} {filters.model && filters.model}
          </h1>
        </div>

        <div className="flex gap-6">
          {/* Filters */}
          <FilterPanel
            filters={filters}
            onChange={updateFilters}
            resultCount={filteredProducts.length}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 4h12M4 8h8M6 12h4" />
                  </svg>
                  Фильтры
                  {activeChips.length > 0 && (
                    <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeChips.length}
                    </span>
                  )}
                </button>

                {/* Active chips */}
                <div className="hidden sm:flex flex-wrap gap-1.5">
                  {activeChips.map(chip => (
                    <span
                      key={chip.key}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {chip.value}
                      <button
                        onClick={() => {
                          const newFilters = { ...filters, [chip.key]: undefined };
                          updateFilters(newFilters);
                        }}
                        className="hover:text-primary-dark"
                        aria-label={`Убрать фильтр ${chip.value}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:border-primary outline-none"
                aria-label="Сортировка"
              >
                <option value="date">По дате</option>
                <option value="price_asc">Цена ↑</option>
                <option value="price_desc">Цена ↓</option>
                <option value="mileage_asc">Пробег ↑</option>
                <option value="year_desc">Год ↓</option>
              </select>
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">Ничего не найдено</h3>
                <p className="text-slate-600 mb-4">Попробуйте изменить параметры фильтра или оставьте заявку — подберём под заказ.</p>
                <a href="#order-form" className="inline-flex bg-primary hover:bg-primary-dark text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
                  Оставить заявку
                </a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {paginatedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>

                {hasMore && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setPage(p => p + 1)}
                      className="bg-white border border-slate-300 hover:border-primary text-slate-700 hover:text-primary font-medium px-6 py-3 rounded-lg text-sm transition-colors"
                    >
                      Показать ещё ({filteredProducts.length - paginatedProducts.length})
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
