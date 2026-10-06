export default function ContactsPage() {
  return (
    <main className="bg-surface-alt min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <a href="/" className="hover:text-primary">Главная</a>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Контакты</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Контакты</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Свяжитесь с нами</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-slate-500">Телефон</div>
                <a href="tel:+78632000000" className="text-lg font-semibold text-slate-900 hover:text-primary transition-colors">
                  +7 (863) 200-00-00
                </a>
              </div>
              <div>
                <div className="text-sm text-slate-500">Режим работы</div>
                <div className="text-slate-900">Ежедневно 10:00–19:00</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Адрес</div>
                <div className="text-slate-900">г. Ростов-на-Дону</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Авито</div>
                <a href="https://avito.ru" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark font-medium">
                  Наш профиль на Авито →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Реквизиты</h2>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-slate-500">Организация</div>
                <div className="text-slate-900 font-medium">ИП Блохинов Е.М.</div>
              </div>
              <div>
                <div className="text-slate-500">ИНН</div>
                <div className="text-slate-900">616601402445</div>
              </div>
              <div>
                <div className="text-slate-500">ОГРНИП</div>
                <div className="text-slate-900">318619600120272</div>
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <div className="text-4xl mb-2">📍</div>
              <div className="text-sm">Карта (Ростов-на-Дону)</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
