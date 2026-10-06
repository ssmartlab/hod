import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockProducts, allBrands, allModels } from '../data/mock';
import ProductCard from '../components/ProductCard';
import ContactForm from '../components/ContactForm';

export default function HomePage() {
  const navigate = useNavigate();
  const [heroForm, setHeroForm] = useState({ brand: '', model: '', year: '', type: 'engine' });
  // Form modal state (reserved for future use)

  const latestProducts = mockProducts.slice(0, 8);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (heroForm.brand) params.set('brand', heroForm.brand);
    if (heroForm.model) params.set('model', heroForm.model);
    if (heroForm.year) params.set('yearFrom', heroForm.year);
    if (heroForm.type) params.set('category', heroForm.type);
    navigate(`/catalog?${params.toString()}`);
  };

  const models = heroForm.brand && allModels[heroForm.brand] ? allModels[heroForm.brand] : [];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Контрактные двигатели и КПП с гарантией
            </h1>
            <p className="text-lg text-blue-100 mb-8">
              Б/у агрегаты из Японии, Европы и Кореи. Проверка на стенде, гарантия 30 дней, доставка по России.
            </p>
          </div>

          {/* Quick search */}
          <form onSubmit={handleHeroSearch} className="bg-white rounded-xl p-4 sm:p-6 shadow-xl max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Марка</label>
                <select
                  value={heroForm.brand}
                  onChange={(e) => setHeroForm({ ...heroForm, brand: e.target.value, model: '' })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:border-primary outline-none"
                >
                  <option value="">Выберите марку</option>
                  {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Модель</label>
                <select
                  value={heroForm.model}
                  onChange={(e) => setHeroForm({ ...heroForm, model: e.target.value })}
                  disabled={!heroForm.brand}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:border-primary outline-none disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">Выберите модель</option>
                  {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Год</label>
                <input
                  type="number"
                  value={heroForm.year}
                  onChange={(e) => setHeroForm({ ...heroForm, year: e.target.value })}
                  placeholder="2015"
                  min="1990"
                  max="2025"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Тип</label>
                <select
                  value={heroForm.type}
                  onChange={(e) => setHeroForm({ ...heroForm, type: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:border-primary outline-none"
                >
                  <option value="engine">Двигатель</option>
                  <option value="akpp">АКПП</option>
                  <option value="mkpp">МКПП</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full sm:w-auto bg-primary hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Найти агрегат
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 lg:py-16 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Категории</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/catalog?category=engine" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M7 10l5-5 5 5M7 14l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">Двигатели</h3>
              <p className="text-sm text-slate-500 mt-1">Бензиновые, дизельные, гибридные</p>
            </Link>
            <Link to="/catalog?category=akpp" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">АКПП</h3>
              <p className="text-sm text-slate-500 mt-1">Автоматические коробки передач</p>
            </Link>
            <Link to="/catalog?category=mkpp" className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">МКПП</h3>
              <p className="text-sm text-slate-500 mt-1">Механические коробки передач</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Страны поставки</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/catalog?country=japan" className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-all group">
              <div className="text-3xl mb-2">🇯🇵</div>
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">Япония</h3>
              <p className="text-sm text-slate-500 mt-1">Toyota, Nissan, Honda, Mazda, Subaru</p>
            </Link>
            <Link to="/catalog?country=europe" className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-all group">
              <div className="text-3xl mb-2">🇪🇺</div>
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">Европа</h3>
              <p className="text-sm text-slate-500 mt-1">BMW, Mercedes, VW, Audi, Ford, Opel</p>
            </Link>
            <Link to="/catalog?country=korea" className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-all group">
              <div className="text-3xl mb-2">🇰🇷</div>
              <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors">Корея</h3>
              <p className="text-sm text-slate-500 mt-1">Hyundai, Kia</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest arrivals */}
      <section className="py-12 lg:py-16 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Последние поступления</h2>
            <Link to="/catalog" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Весь каталог →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Гарантии</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: '📄', title: 'Договор', desc: 'Официальный документ на каждую сделку' },
              { icon: '🛡️', title: '30 дней', desc: 'Гарантия на все агрегаты' },
              { icon: '🔧', title: 'Стенд', desc: 'Проверка работоспособности' },
              { icon: '💰', title: 'Возврат', desc: 'Возврат денег при браке' },
              { icon: '✅', title: 'Документы', desc: '«Белая» растаможка' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-sm text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 lg:py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold">7</div>
              <div className="text-sm text-blue-200 mt-1">лет на рынке</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold">3 800+</div>
              <div className="text-sm text-blue-200 mt-1">проданных агрегатов</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold">50 000+</div>
              <div className="text-sm text-blue-200 mt-1">позиций в наличии</div>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Как мы работаем</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Заявка', desc: 'Оставляете заявку или звоните. Уточняем марку, модель, год и код двигателя.' },
              { step: '02', title: 'Подбор', desc: 'Находим подходящий агрегат на складе или заказываем из-за рубежа.' },
              { step: '03', title: 'Проверка', desc: 'Проверяем на стенде, делаем фото и видео, отправляем вам.' },
              { step: '04', title: 'Доставка', desc: 'Отправляем транспортной компанией. Гарантия 30 дней.' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-primary/10 absolute -top-2 -left-1">{item.step}</div>
                <div className="relative pt-8">
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section className="py-12 lg:py-16 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Доставка по всей России</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">Работаем с ведущими транспортными компаниями. Рассчитаем стоимость и сроки доставки до вашего города.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['КИТ', 'Деловые Линии', 'ПЭК', 'Байкал-Сервис', 'Энергия', 'ЖелДорЭкспедиция'].map(name => (
              <div key={name} className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700">
                {name}
              </div>
            ))}
          </div>
          <Link to="/delivery" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition-colors">
            Рассчитать доставку
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 8h8M8 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Алексей М.', city: 'Краснодар', text: 'Заказывал двигатель Toyota Camry 2.4. Пришёл в отличном состоянии, проверили при получении. Рекомендую!' },
              { name: 'Сергей В.', city: 'Волгоград', text: 'Брал АКПП на BMW. Доставили за 4 дня. Всё работает, гарантия есть. Спасибо!' },
              { name: 'Дмитрий К.', city: 'Ставрополь', text: 'Подобрали двигатель за день, хотя думал придётся ждать. Цена адекватная, сервис на уровне.' },
            ].map((review, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b">
                      <path d="M8 0l2.5 5 5.5.8-4 3.9.9 5.3L8 12.5 3.1 15l.9-5.3-4-3.9L5.5 5z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-700 mb-3">«{review.text}»</p>
                <div className="text-xs text-slate-500">{review.name}, {review.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-12 lg:py-16 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <ContactForm
              title="Не нашли нужный агрегат?"
              subtitle="Подберём под заказ из Японии, Европы или Кореи"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
