import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" fill="currentColor"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg text-primary leading-tight">ХОД ПОРШНЯ</div>
              <div className="text-xs text-slate-500">Контрактные двигатели и КПП</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/catalog" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Каталог</Link>
            <Link to="/about" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">О нас</Link>
            <Link to="/delivery" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Доставка</Link>
            <Link to="/contacts" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Контакты</Link>
          </nav>

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <a href="tel:+78632000000" className="font-semibold text-slate-900 hover:text-primary transition-colors text-lg">
                +7 (863) 200-00-00
              </a>
              <div className="text-xs text-slate-500">Ежедневно 10:00–19:00</div>
            </div>
            <Link
              to="/catalog"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              Подобрать двигатель
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-primary"
            aria-label="Меню"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="px-4 py-4 space-y-3">
            <Link to="/catalog" onClick={() => setMobileOpen(false)} className="block text-base font-medium text-slate-700 hover:text-primary">Каталог</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block text-base font-medium text-slate-700 hover:text-primary">О нас</Link>
            <Link to="/delivery" onClick={() => setMobileOpen(false)} className="block text-base font-medium text-slate-700 hover:text-primary">Доставка</Link>
            <Link to="/contacts" onClick={() => setMobileOpen(false)} className="block text-base font-medium text-slate-700 hover:text-primary">Контакты</Link>
            <hr className="border-slate-200" />
            <a href="tel:+78632000000" className="block font-semibold text-primary text-lg">+7 (863) 200-00-00</a>
            <div className="text-sm text-slate-500">Ежедневно 10:00–19:00</div>
            <Link
              to="/catalog"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Подобрать двигатель
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
