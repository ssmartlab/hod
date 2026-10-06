import { Link } from 'react-router-dom';
import { Product } from '../data/types';
import { formatPrice, formatMileage, getCountryLabel, getCategoryLabel } from '../utils/format';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col"
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <img
          src={product.photos[0]}
          alt={`${getCategoryLabel(product.category)} ${product.brand} ${product.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.availability === 'in_stock' && (
            <span className="bg-emerald-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              В наличии
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {getCountryLabel(product.country)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-slate-500 mb-1">{product.sku}</div>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {getCategoryLabel(product.category)} {product.brand} {product.model} {product.volume} {product.engine_code}
        </h3>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-slate-600 mb-3">
          <div>Год: <span className="font-medium text-slate-800">{product.year}</span></div>
          <div>Объём: <span className="font-medium text-slate-800">{product.volume} л</span></div>
          <div>Код: <span className="font-medium text-slate-800">{product.engine_code || '—'}</span></div>
          <div>Пробег: <span className="font-medium text-slate-800">{formatMileage(product.mileage)}</span></div>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="font-bold text-lg text-slate-900">
            {formatPrice(product.price, product.currency)}
          </div>
          <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
            Подробнее
          </span>
        </div>
      </div>
    </Link>
  );
}
