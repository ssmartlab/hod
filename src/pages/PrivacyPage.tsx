export default function PrivacyPage() {
  return (
    <main className="bg-surface-alt min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <nav className="text-sm text-slate-500 mb-4">
          <a href="/" className="hover:text-primary">Главная</a>
          <span className="mx-2">/</span>
          <span className="text-slate-900">Политика конфиденциальности</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-6">Политика обработки персональных данных</h1>

        <div className="bg-white border border-slate-200 rounded-xl p-6 prose prose-slate max-w-none">
          <section className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Общие положения</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
              пользователей сайта hod-porshnya.ru (далее — Сайт). Оператор персональных данных —
              ИП Блохинов Е.М., ИНН 616601402445, ОГРНИП 318619600120272.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Состав собираемых данных</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              При оставлении заявки на Сайте могут собираться следующие данные: имя, номер телефона,
              информация об автомобиле (марка, модель, год), VIN-номер (при указании), комментарий.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Цели обработки</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Персональные данные обрабатываются исключительно для связи с пользователем, подбора
              автозапчастей и оформления заказа.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Защита данных</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Оператор принимает необходимые организационные и технические меры для защиты персональных
              данных от неправомерного доступа, изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Права пользователя</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Пользователь имеет право запросить информацию о хранящихся персональных данных, потребовать
              их уточнения, блокирования или удаления, направив запрос оператору.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
