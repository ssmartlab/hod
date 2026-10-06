import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <div className="font-bold text-xl text-white mb-3">ХОД ПОРШНЯ</div>
            <p className="text-sm text-slate-400 mb-4">
              Контрактные б/у двигатели и КПП из Японии, Европы и Кореи. Доставка по всей России.
            </p>
            <div className="text-xs text-slate-500">
              ИП Блохинов Е.М.<br />
              ИНН 616601402445<br />
              ОГРНИП 318619600120272
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-semibold text-white mb-3">Каталог</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog?category=engine" className="hover:text-white transition-colors">Двигатели</Link></li>
              <li><Link to="/catalog?category=akpp" className="hover:text-white transition-colors">АКПП</Link></li>
              <li><Link to="/catalog?category=mkpp" className="hover:text-white transition-colors">МКПП</Link></li>
              <li><Link to="/catalog?country=japan" className="hover:text-white transition-colors">Из Японии</Link></li>
              <li><Link to="/catalog?country=europe" className="hover:text-white transition-colors">Из Европы</Link></li>
              <li><Link to="/catalog?country=korea" className="hover:text-white transition-colors">Из Кореи</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-white mb-3">Информация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">О компании</Link></li>
              <li><Link to="/delivery" className="hover:text-white transition-colors">Оплата и доставка</Link></li>
              <li><Link to="/reviews" className="hover:text-white transition-colors">Отзывы</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-white mb-3">Контакты</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+78632000000" className="hover:text-white transition-colors font-medium">
                  +7 (863) 200-00-00
                </a>
              </li>
              <li className="text-slate-400">Ежедневно 10:00–19:00</li>
              <li className="text-slate-400">г. Ростов-на-Дону</li>
              <li className="pt-2">
                <a
                  href="https://avito.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark transition-colors"
                >
                  Мы на Авито →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Ход Поршня. Все права защищены.</p>
          <p className="text-xs text-slate-600">Информация на сайте не является публичной офертой</p>
        </div>
      </div>
    </footer>
  );
}
