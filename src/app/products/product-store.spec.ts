import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductStore } from './product-store';
import { Product } from './product.model';

const PRODUCTS: Product[] = [
  { id: 1, name: 'Mesa', price: 100, active: true },
  { id: 2, name: 'Silla', price: 50, active: false },
];

describe('ProductStore', () => {
  let store: ProductStore;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    store = TestBed.inject(ProductStore);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads products and clears the loading state', () => {
    store.load();
    expect(store.loading()).toBe(true);

    http.expectOne('/api/products').flush(PRODUCTS);

    expect(store.products()).toEqual(PRODUCTS);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  it('exposes an error and stops loading when the request fails', () => {
    store.load();
    http.expectOne('/api/products').flush(null, { status: 500, statusText: 'Server Error' });

    expect(store.error()).toBe('No se pudieron cargar los productos.');
    expect(store.loading()).toBe(false);
  });

  it('removes a product from the list after deleting it', () => {
    store.load();
    http.expectOne('/api/products').flush(PRODUCTS);

    store.remove(1);
    const request = http.expectOne('/api/products/1');
    expect(request.request.method).toBe('DELETE');
    request.flush(null);

    expect(store.products().map((p) => p.id)).toEqual([2]);
  });
});
