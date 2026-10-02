import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Product } from '../../product.model';
import { ProductTable } from './product-table';

describe('ProductTable', () => {
  function render(products: Product[]) {
    TestBed.configureTestingModule({
      imports: [ProductTable],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ProductTable);
    fixture.componentRef.setInput('products', products);
    fixture.detectChanges();
    return fixture;
  }

  it('renders one row per product', () => {
    const fixture = render([
      { id: 1, name: 'Mesa', price: 100, active: true },
      { id: 2, name: 'Silla', price: 50, active: false },
    ]);
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');

    expect(rows).toHaveLength(2);
    expect(rows[0].textContent).toContain('Mesa');
    expect(rows[1].textContent).toContain('Inactivo');
  });

  it('shows an empty message when there are no products', () => {
    const fixture = render([]);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'No hay productos registrados.',
    );
  });

  it('emits the product when its delete button is clicked', () => {
    const product: Product = { id: 1, name: 'Mesa', price: 100, active: true };
    const fixture = render([product]);
    let removed: Product | undefined;
    fixture.componentInstance.remove.subscribe((p) => (removed = p));

    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button')!.click();

    expect(removed).toEqual(product);
  });
});
