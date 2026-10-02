import { Injectable, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ProductApi } from './product-api';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private readonly api = inject(ProductApi);

  private readonly _products = signal<Product[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  load() {
    this._loading.set(true);
    this._error.set(null);
    this.api
      .getAll()
      .pipe(finalize(() => this._loading.set(false)))
      .subscribe({
        next: (products) => this._products.set(products),
        error: () => this._error.set('No se pudieron cargar los productos.'),
      });
  }

  remove(id: number) {
    this._error.set(null);
    this.api.delete(id).subscribe({
      next: () => this._products.update((list) => list.filter((p) => p.id !== id)),
      error: () => this._error.set('No se pudo eliminar el producto.'),
    });
  }
}
