import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NewProduct, Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/products';

  getAll() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: NewProduct) {
    return this.http.post<Product>(this.baseUrl, product);
  }

  update(product: Product) {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
