import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

export default function AboutPage() {
  return (
    <main className="bg-surface-alt min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <a href="/" className="hover:text-primary">Главная</a>
          <span className="mx-2">/</span>
          <span className="text-slate-900">О компании</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">О компании «Ход Поршня»</h1>

        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6">
          <p className="text-slate-700 leading-relaxed mb-4">
            Компания «Ход Поршня» работает на рынке контрактных б/у двигателей и коробок передач с 2017 года.
            Мы специализируемся на поставке агрегатов из Японии, Европы и Кореи для легковых автомобилей.
          </p>
          <p className="text-slate-700 leading-relaxed mb-4">
            Каждый агрегат проходит проверку на стенде перед отправкой. Мы предоставляем гарантию 30 дней
            и официальный договор на каждую сделку. Доставка осуществляется транспортными компаниями по всей России.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Наш склад находится в Ростове-на-Дону. Мы работаем как с розничными клиентами, так и с автосервисами.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">7 лет</div>
            <div className="text-sm text-slate-500">на рынке</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">3 800+</div>
            <div className="text-sm text-slate-500">проданных агрегатов</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">50 000+</div>
            <div className="text-sm text-slate-500">позиций в каталоге</div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <ContactForm
            title="Остались вопросы?"
            subtitle="Свяжитесь с нами — поможем подобрать агрегат"
          />
        </div>
      </div>
    </main>
  );
}
