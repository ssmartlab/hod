export default function DeliveryPage() {
  return (
    <main className="bg-surface-alt min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <a href="/" className="hover:text-primary">Главная</a>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Оплата и доставка</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Оплата и доставка</h1>

        <div className="space-y-6">
          {/* Delivery */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Доставка</h2>
            <p className="text-slate-700 mb-4">
              Доставляем агрегаты транспортными компаниями по всей России. Стоимость и сроки зависят от города получения и габаритов груза.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['КИТ', 'Деловые Линии', 'ПЭК', 'Байкал-Сервис', 'Энергия', 'ЖелДорЭкспедиция'].map(name => (
                <div key={name} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center text-sm font-medium text-slate-700">
                  {name}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-4">
              * Точную стоимость доставки уточняйте у менеджера при оформлении заказа.
            </p>
          </section>

          {/* Payment */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Оплата</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Наличный расчёт — при самовывозе со склада в Ростове-на-Дону</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Безналичный перевод — для юридических лиц и ИП</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Перевод на карту — для физических лиц</span>
              </li>
            </ul>
          </section>

          {/* Guarantee */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Гарантия</h2>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Гарантия 30 дней на все агрегаты</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Каждый двигатель проверяется на стенде перед отправкой</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Возврат денег или замена при обнаружении дефекта</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Официальный договор на каждую сделку</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
