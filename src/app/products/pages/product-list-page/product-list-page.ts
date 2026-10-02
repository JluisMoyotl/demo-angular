import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductTable } from '../../components/product-table/product-table';
import { ProductStore } from '../../product-store';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductTable, RouterLink],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductListPage implements OnInit {
  protected readonly store = inject(ProductStore);

  ngOnInit() {
    this.store.load();
  }

  protected confirmRemove(product: Product) {
    if (confirm(`¿Eliminar "${product.name}"?`)) {
      this.store.remove(product.id);
    }
  }
}
