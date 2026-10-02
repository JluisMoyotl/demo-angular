import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ProductApi } from '../../product-api';

@Component({
  selector: 'app-product-form-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './product-form-page.html',
  styleUrl: './product-form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductFormPage implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly api = inject(ProductApi);
  private readonly router = inject(Router);

  /** Route parameter `:id`; undefined when creating a product. */
  readonly id = input<string>();

  protected readonly isEdit = computed(() => this.id() !== undefined);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    price: [0, [Validators.required, Validators.min(0)]],
    active: [true],
  });

  ngOnInit() {
    const id = this.id();
    if (id !== undefined) {
      this.api.getById(Number(id)).subscribe({
        next: (product) => this.form.patchValue(product),
        error: () => this.error.set('No se encontró el producto.'),
      });
    }
  }

  protected save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const product = this.form.getRawValue();
    const id = this.id();
    const request =
      id !== undefined ? this.api.update({ id: Number(id), ...product }) : this.api.create(product);

    this.saving.set(true);
    this.error.set(null);
    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => this.router.navigate(['/products']),
      error: () => this.error.set('No se pudo guardar el producto.'),
    });
  }
}
