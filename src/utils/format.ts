export function formatPrice(price: number | null, currency: string = 'RUB'): string {
  if (price === null) return 'Узнать цену';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(km: number): string {
  return `${km.toLocaleString('ru-RU')} км`;
}

export function formatVolume(vol: string): string {
  return `${vol} л`;
}

export function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    engine: 'Двигатель',
    akpp: 'АКПП',
    mkpp: 'МКПП',
    other: 'Другое',
  };
  return labels[cat] || cat;
}

export function getFuelLabel(fuel: string): string {
  const labels: Record<string, string> = {
    petrol: 'Бензин',
    diesel: 'Дизель',
    hybrid: 'Гибрид',
  };
  return labels[fuel] || fuel;
}

export function getCountryLabel(country: string): string {
  const labels: Record<string, string> = {
    japan: 'Япония',
    europe: 'Европа',
    korea: 'Корея',
  };
  return labels[country] || country;
}

export function getEquipmentLabel(eq: string): string {
  const labels: Record<string, string> = {
    full: 'С навесным',
    bare: 'Голый',
  };
  return labels[eq] || eq;
}

export function getAvailabilityLabel(av: string): string {
  const labels: Record<string, string> = {
    in_stock: 'В наличии',
    on_order: 'Под заказ',
  };
  return labels[av] || av;
}
