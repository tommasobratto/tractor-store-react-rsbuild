export interface Teaser {
  title: string;
  image: string;
  url: string;
}

export interface Category {
  key: string;
  name: string;
}

export interface Store {
  id: string;
  name: string;
  street: string;
  city: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  highlights: string[];
}

export interface ProductVariant {
  sku: string;
  productId: string;
  variantName: string;
  fullName: string;
  price: number;
  image: string;
  colorHex: string;
  colorRgb: number[];
  inventory: number;
}

export interface StoreDatabase {
  teaser: Teaser[];
  categories: Category[];
  stores: Store[];
  products: Product[];
  variants: ProductVariant[];
}
