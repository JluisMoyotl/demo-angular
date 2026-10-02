export interface Product {
  id: number;
  name: string;
  price: number;
  active: boolean;
}

export type NewProduct = Omit<Product, 'id'>;
