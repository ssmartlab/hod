export type Category = 'engine' | 'akpp' | 'mkpp' | 'other';
export type Fuel = 'petrol' | 'diesel' | 'hybrid';
export type Country = 'japan' | 'europe' | 'korea';
export type Equipment = 'full' | 'bare';
export type Availability = 'in_stock' | 'on_order';

export interface Product {
  id: string;
  sku: string;
  category: Category;
  brand: string;
  model: string;
  generation?: string;
  year: number;
  engine_code?: string;
  volume: string;
  fuel: Fuel;
  power?: number;
  transmission?: string;
  mileage: number;
  country: Country;
  equipment: Equipment;
  price: number | null;
  currency: string;
  availability: Availability;
  photos: string[];
  video?: string;
  description: string;
  created_at: string;
}

export interface Filters {
  brand?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  category?: Category;
  volume?: string;
  fuel?: Fuel;
  engineCode?: string;
  country?: Country;
  equipment?: Equipment;
  mileageFrom?: number;
  mileageTo?: number;
  priceFrom?: number;
  priceTo?: number;
  availability?: Availability;
  search?: string;
}

export interface SortOption {
  value: string;
  label: string;
}
