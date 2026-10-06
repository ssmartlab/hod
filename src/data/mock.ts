import { Product } from './types';

const brands = ['Toyota', 'Nissan', 'Honda', 'Mazda', 'Mitsubishi', 'Subaru', 'Hyundai', 'Kia', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Audi', 'Ford', 'Opel', 'Renault', 'Peugeot'];

const modelsByBrand: Record<string, string[]> = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Land Cruiser', 'Mark II', 'Crown'],
  'Nissan': ['X-Trail', 'Qashqai', 'Patrol', 'Teana', 'Note', 'Primera'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Fit', 'Odyssey'],
  'Mazda': ['3', '6', 'CX-5', 'CX-7', 'RX-8'],
  'Mitsubishi': ['Lancer', 'Outlander', 'Pajero', 'ASX', 'L200'],
  'Subaru': ['Forester', 'Impreza', 'Legacy', 'Outback', 'XV'],
  'Hyundai': ['Solaris', 'Tucson', 'Santa Fe', 'i30', 'Sonata'],
  'Kia': ['Rio', 'Sportage', 'Ceed', 'Sorento', 'Optima'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'S-Class', 'GLK', 'ML'],
  'Volkswagen': ['Golf', 'Passat', 'Tiguan', 'Touareg', 'Polo'],
  'Audi': ['A4', 'A6', 'Q5', 'Q7', 'A3'],
  'Ford': ['Focus', 'Mondeo', 'Kuga', 'Explorer', 'Fiesta'],
  'Opel': ['Astra', 'Insignia', 'Corsa', 'Mokka', 'Zafira'],
  'Renault': ['Logan', 'Duster', 'Megane', 'Fluence', 'Kaptur'],
  'Peugeot': ['308', '408', '3008', '508', '208'],
};

const engineCodes: Record<string, string[]> = {
  'Toyota': ['1ZR-FE', '2ZR-FE', '2AZ-FE', '1GR-FE', '1JZ-GE', '3S-FE', '1NZ-FE'],
  'Nissan': ['MR20DE', 'QR20DE', 'VQ35DE', 'HR16DE', 'QR25DE', 'RD28'],
  'Honda': ['R18A', 'K20A', 'K24A', 'L15A', 'D16Y'],
  'Mazda': ['LF', 'L8', 'FS', 'FP', 'RF'],
  'Mitsubishi': ['4G63', '4G69', '4B11', '4N15', '6G72'],
  'Subaru': ['EJ20', 'EJ25', 'FB20', 'FB25', 'FA20'],
  'Hyundai': ['G4FC', 'G4FD', 'G4KE', 'D4EA', 'G4NA'],
  'Kia': ['G4FC', 'G4FG', 'G4KE', 'D4CB', 'G4NA'],
  'BMW': ['N46', 'N52', 'N47', 'M54', 'N20'],
  'Mercedes-Benz': ['M271', 'M272', 'OM646', 'OM651', 'M274'],
  'Volkswagen': ['BWA', 'BZB', 'CAXA', 'CAYC', 'CFNA'],
  'Audi': ['AUM', 'AWE', 'BKB', 'CDHA', 'CAGA'],
  'Ford': ['DURATEC-HE', 'DURATEC-Ti', 'DW10', 'PSA-DV6', 'ECOBOOST'],
  'Opel': ['A16XER', 'Z16XEP', 'A18XER', 'Z18XER', 'Z20LER'],
  'Renault': ['K4M', 'F4R', 'K9K', 'H4M', 'F5R'],
  'Peugeot': ['EP6', 'EP3', 'DV6', 'TU5', 'EW10'],
};

const countries: Array<'japan' | 'europe' | 'korea'> = ['japan', 'europe', 'korea'];
const fuels: Array<'petrol' | 'diesel' | 'hybrid'> = ['petrol', 'diesel', 'hybrid'];
const equipments: Array<'full' | 'bare'> = ['full', 'bare'];
const availabilities: Array<'in_stock' | 'on_order'> = ['in_stock', 'on_order'];

function generateProducts(count: number): Product[] {
  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const brand = brands[i % brands.length];
    const models = modelsByBrand[brand];
    const model = models[Math.floor(Math.random() * models.length)];
    const codes = engineCodes[brand];
    const code = codes[Math.floor(Math.random() * codes.length)];
    const year = 2005 + Math.floor(Math.random() * 18);
    const fuel = fuels[Math.floor(Math.random() * fuels.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const equipment = equipments[Math.floor(Math.random() * equipments.length)];
    const availability = availabilities[Math.floor(Math.random() * 2)];
    const volumeOptions = ['1.4', '1.6', '1.8', '2.0', '2.4', '2.5', '3.0', '3.5'];
    const volume = volumeOptions[Math.floor(Math.random() * volumeOptions.length)];
    const mileage = Math.floor(Math.random() * 200000) + 20000;
    const price = Math.floor(Math.random() * 250000) + 35000;
    const category = i % 5 === 4 ? (Math.random() > 0.5 ? 'akpp' : 'mkpp') : 'engine';
    const power = fuel === 'diesel' ? 90 + Math.floor(Math.random() * 150) : 100 + Math.floor(Math.random() * 200);

    products.push({
      id: `prod-${i + 1}`,
      sku: `HP-${String(10000 + i).slice(1)}`,
      category,
      brand,
      model,
      generation: undefined,
      year,
      engine_code: code,
      volume,
      fuel,
      power,
      transmission: category === 'akpp' ? 'АКПП' : category === 'mkpp' ? 'МКПП' : (Math.random() > 0.5 ? 'АКПП' : 'МКПП'),
      mileage,
      country,
      equipment,
      price: Math.random() > 0.15 ? price : null,
      currency: 'RUB',
      availability,
      photos: [
        `https://placehold.co/600x400/e2e8f0/475569?text=${brand}+${model}`,
        `https://placehold.co/600x400/f1f5f9/64748b?text=${code}`,
        `https://placehold.co/600x400/e2e8f0/475569?text=Фото+3`,
      ],
      description: `Контрактный ${category === 'engine' ? 'двигатель' : category === 'akpp' ? 'АКПП' : 'МКПП'} ${brand} ${model} ${volume}L ${code}. Пробег ${mileage.toLocaleString('ru-RU')} км. Страна поставки: ${country === 'japan' ? 'Япония' : country === 'europe' ? 'Европа' : 'Корея'}. Комплектация: ${equipment === 'full' ? 'с навесным' : 'голый'}. Проверен на стенде. Гарантия 30 дней.`,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
    });
  }

  return products;
}

export const mockProducts: Product[] = generateProducts(48);

export const allBrands = brands;
export const allModels = modelsByBrand;
export const allEngineCodes = engineCodes;
