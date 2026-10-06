import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import DeliveryPage from './pages/DeliveryPage';
import ContactsPage from './pages/ContactsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

function ReviewsPage() {
  return (
    <main className="bg-surface-alt min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <a href="/" className="hover:text-primary">Главная</a>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Отзывы</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Отзывы клиентов</h1>

        <div className="space-y-4">
          {[
            { name: 'Алексей М.', city: 'Краснодар', date: '15.11.2024', rating: 5, text: 'Заказывал двигатель Toyota Camry 2.4 (2AZ-FE). Пришёл в отличном состоянии, проверили при получении. Пробег реальный, compression в норме. Рекомендую!' },
            { name: 'Сергей В.', city: 'Волгоград', date: '02.11.2024', rating: 5, text: 'Брал АКПП на BMW 5 Series. Доставили за 4 дня. Всё работает, гарантия есть. Менеджер помог с подбором, спасибо!' },
            { name: 'Дмитрий К.', city: 'Ставрополь', date: '28.10.2024', rating: 5, text: 'Подобрали двигатель за день, хотя думал придётся ждать неделю. Цена адекватная, сервис на уровне. Буду обращаться ещё.' },
            { name: 'Игорь Л.', city: 'Краснодар', date: '20.10.2024', rating: 4, text: 'Заказывал МКПП на Nissan X-Trail. Всё пришло, работает. Немного задержали с отправкой, но предупредили заранее. В целом доволен.' },
            { name: 'Андрей П.', city: 'Ростов-на-Дону', date: '12.10.2024', rating: 5, text: 'Самовывоз со склада. Двигатель Hyundai Tucson 2.0 — как новый. Проверили при мне. Договор, чек, гарантия. Всё чётко.' },
            { name: 'Виктор Н.', city: 'Воронеж', date: '05.10.2024', rating: 5, text: 'Второй раз заказываю здесь. Первый раз брал двигатель на Kia Sportage, теперь АКПП на Mazda 6. Оба раза всё отлично. Рекомендую знакомым.' },
          ].map((review, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{review.name}</div>
                    <div className="text-xs text-slate-500">{review.city}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 16 16" fill={j < review.rating ? '#f59e0b' : '#e2e8f0'}>
                        <path d="M8 0l2.5 5 5.5.8-4 3.9.9 5.3L8 12.5 3.1 15l.9-5.3-4-3.9L5.5 5z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{review.date}</div>
                </div>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
