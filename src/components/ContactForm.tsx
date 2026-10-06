import { useState } from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  compact?: boolean;
  prefill?: { what?: string; brand?: string; model?: string };
}

export default function ContactForm({ title = 'Оставить заявку', subtitle = 'Перезвоним в течение 15 минут', compact = false, prefill }: Props) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    what: prefill?.what || '',
    brand: prefill?.brand || '',
    model: prefill?.model || '',
    year: '',
    vin: '',
    comment: '',
    consent: false,
    honeypot: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return; // spam
    if (!form.consent) return;
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      // Yandex.Metrika goal
      if (typeof window !== 'undefined' && (window as any).ym) {
        (window as any).ym(90695485, 'reachGoal', 'form_submit');
        (window as any).ym(103877736, 'reachGoal', 'form_submit');
      }
    }, 1000);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^\d+]/g, '');
    if (val.startsWith('8')) val = '+7' + val.slice(1);
    if (val.startsWith('7')) val = '+' + val;
    if (!val.startsWith('+')) val = '+' + val;
    // Format
    const digits = val.replace(/\D/g, '');
    if (digits.length > 11) return;
    let formatted = '+7';
    if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
    if (digits.length > 4) formatted += ') ' + digits.slice(4, 7);
    if (digits.length > 7) formatted += '-' + digits.slice(7, 9);
    if (digits.length > 9) formatted += '-' + digits.slice(9, 11);
    setForm({ ...form, phone: formatted });
  };

  if (status === 'success') {
    return (
      <div className={`bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center ${compact ? '' : 'max-w-md mx-auto'}`}>
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg width="24" height="24" fill="none" stroke="#059669" strokeWidth="2">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-emerald-900 text-lg">Заявка отправлена!</h3>
        <p className="text-sm text-emerald-700 mt-1">Мы перезвоним вам в течение 15 минут</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`${compact ? '' : 'max-w-lg'} space-y-4`}>
      {title && (
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={form.honeypot}
        onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="form-name" className="block text-sm font-medium text-slate-700 mb-1">Ваше имя</label>
          <input
            id="form-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder="Иван"
          />
        </div>
        <div>
          <label htmlFor="form-phone" className="block text-sm font-medium text-slate-700 mb-1">Телефон *</label>
          <input
            id="form-phone"
            type="tel"
            required
            value={form.phone}
            onChange={handlePhoneChange}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder="+7 (___) ___-__-__"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="form-what" className="block text-sm font-medium text-slate-700 mb-1">Что ищете?</label>
          <select
            id="form-what"
            value={form.what}
            onChange={(e) => setForm({ ...form, what: e.target.value })}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors bg-white"
          >
            <option value="">Выберите</option>
            <option value="engine">Двигатель</option>
            <option value="akpp">АКПП</option>
            <option value="mkpp">МКПП</option>
          </select>
        </div>
        <div>
          <label htmlFor="form-brand" className="block text-sm font-medium text-slate-700 mb-1">Марка</label>
          <input
            id="form-brand"
            type="text"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder="Toyota"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="form-model" className="block text-sm font-medium text-slate-700 mb-1">Модель</label>
          <input
            id="form-model"
            type="text"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder="Camry"
          />
        </div>
        <div>
          <label htmlFor="form-year" className="block text-sm font-medium text-slate-700 mb-1">Год</label>
          <input
            id="form-year"
            type="text"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
            placeholder="2015"
          />
        </div>
      </div>

      <div>
        <label htmlFor="form-comment" className="block text-sm font-medium text-slate-700 mb-1">Комментарий</label>
        <textarea
          id="form-comment"
          rows={2}
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
          placeholder="Код двигателя, VIN, пожелания..."
        />
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          className="mt-0.5 w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
        />
        <span className="text-xs text-slate-500">
          Согласен на обработку <a href="/privacy" className="text-primary underline">персональных данных</a>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'loading' || !form.consent}
        className="w-full bg-primary hover:bg-primary-dark disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors text-sm"
      >
        {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
}
