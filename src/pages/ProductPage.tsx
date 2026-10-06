import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mock';
import { formatPrice, formatMileage, getCategoryLabel, getFuelLabel, getCountryLabel, getEquipmentLabel, getAvailabilityLabel } from '../utils/format';
import ContactForm from '../components/ContactForm';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = mockProducts.find(p => p.id === id);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Товар не найден</h1>
          <p className="text-slate-600 mb-4">Возможно, он был удалён или перемещён.</p>
          <Link to="/catalog" className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium text-sm">
            Перейти в каталог
          </Link>
        </div>
      </main>
    );
  }

  const similarProducts = mockProducts
    .filter(p => p.id !== product.id && p.brand === product.brand && p.category === product.category)
    .slice(0, 4);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${getCategoryLabel(product.category)} ${product.brand} ${product.model} ${product.volume} ${product.engine_code}`,
    sku: product.sku,
    description: product.description,
    offers: {
      '@type': 'Offer',
      price: product.price || 0,
      priceCurrency: product.currency,
      availability: product.availability === 'in_stock'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
    },
  };

  return (
    <main className="bg-surface-alt min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-slate-500 mb-4" aria-label="Хлебные крошки">
          <a href="/" className="hover:text-primary">Главная</a>
          <span className="mx-2">/</span>
          <a href="/catalog" className="hover:text-primary">Каталог</a>
          <span className="mx-2">/</span>
          <a href={`/catalog?brand=${product.brand}`} className="hover:text-primary">{product.brand}</a>
          <span className="mx-2">/</span>
          <span className="text-slate-900 truncate">{product.model}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div>
            <div
              className="aspect-[4/3] bg-white border border-slate-200 rounded-xl overflow-hidden cursor-zoom-in mb-3"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={product.photos[currentPhoto]}
                alt={`${getCategoryLabel(product.category)} ${product.brand} ${product.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPhoto(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === currentPhoto ? 'border-primary' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-xs text-slate-500 mb-1">Артикул: {product.sku}</div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              {getCategoryLabel(product.category)} {product.brand} {product.model} {product.volume} {product.engine_code}
            </h1>

            {/* Price */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 mb-4">
              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-bold text-slate-900">
                  {formatPrice(product.price, product.currency)}
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  product.availability === 'in_stock'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {getAvailabilityLabel(product.availability)}
                </span>
              </div>
            </div>

            {/* Specs table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Год выпуска', product.year],
                    ['Объём', `${product.volume} л`],
                    ['Код двигателя', product.engine_code || '—'],
                    ['Топливо', getFuelLabel(product.fuel)],
                    ['Мощность', product.power ? `${product.power} л.с.` : '—'],
                    ['КПП', product.transmission || '—'],
                    ['Пробег', formatMileage(product.mileage)],
                    ['Страна', getCountryLabel(product.country)],
                    ['Комплектация', getEquipmentLabel(product.equipment)],
                  ].map(([label, value], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : ''}>
                      <td className="px-4 py-2.5 text-slate-500 w-1/2">{label}</td>
                      <td className="px-4 py-2.5 font-medium text-slate-900">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href="#order-form"
                className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).ym) {
                    (window as any).ym(90695485, 'reachGoal', 'order_click');
                    (window as any).ym(103877736, 'reachGoal', 'order_click');
                  }
                }}
              >
                Заказать
              </a>
              <a
                href="tel:+78632000000"
                className="flex-1 border border-slate-300 hover:border-primary text-slate-700 hover:text-primary font-medium py-3 px-6 rounded-lg text-center transition-colors"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).ym) {
                    (window as any).ym(90695485, 'reachGoal', 'phone_click');
                    (window as any).ym(103877736, 'reachGoal', 'phone_click');
                  }
                }}
              >
                Позвонить
              </a>
            </div>

            {/* Guarantees mini */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 rounded-lg p-2">
                <div className="text-lg">🛡️</div>
                <div className="text-xs text-emerald-700 font-medium">Гарантия 30 дней</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="text-lg">🔧</div>
                <div className="text-xs text-blue-700 font-medium">Проверка на стенде</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-2">
                <div className="text-lg">🚚</div>
                <div className="text-xs text-amber-700 font-medium">Доставка по РФ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 bg-white border border-slate-200 rounded-xl p-5">
          <h2 className="font-semibold text-slate-900 mb-3">Описание</h2>
          <p className="text-sm text-slate-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Order form */}
        <div id="order-form" className="mt-8 bg-white border border-slate-200 rounded-xl p-6">
          <ContactForm
            title={`Заказать: ${getCategoryLabel(product.category)} ${product.brand} ${product.model}`}
            subtitle="Оставьте заявку — перезвоним в течение 15 минут"
            prefill={{ what: product.category, brand: product.brand, model: product.model }}
          />
        </div>

        {/* Similar */}
        {similarProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Похожие предложения</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setLightboxOpen(false)} aria-label="Закрыть">×</button>
          <img
            src={product.photos[currentPhoto]}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 lg:hidden z-40">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="font-bold text-lg text-slate-900">{formatPrice(product.price, product.currency)}</div>
          </div>
          <a
            href="#order-form"
            className="bg-primary text-white font-medium py-2.5 px-5 rounded-lg text-sm"
          >
            Заказать
          </a>
          <a
            href="tel:+78632000000"
            className="border border-slate-300 text-slate-700 font-medium py-2.5 px-4 rounded-lg text-sm"
          >
            📞
          </a>
        </div>
      </div>
    </main>
  );
}
