import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-alt">
      <div className="text-center px-4">
        <div className="text-6xl font-bold text-primary/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Страница не найдена</h1>
        <p className="text-slate-600 mb-6">Возможно, она была удалена или перемещена.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="bg-primary hover:bg-primary-dark text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
            На главную
          </Link>
          <Link to="/catalog" className="border border-slate-300 hover:border-primary text-slate-700 hover:text-primary font-medium px-5 py-2.5 rounded-lg text-sm transition-colors">
            Перейти в каталог
          </Link>
        </div>
      </div>
    </main>
  );
}
