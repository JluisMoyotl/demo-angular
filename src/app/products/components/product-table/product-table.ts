import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-table',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-table.html',
  styleUrl: './product-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTable {
  readonly products = input.required<Product[]>();
  readonly remove = output<Product>();
}
