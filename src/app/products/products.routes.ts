import { Routes } from '@angular/router';

const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Productos',
    loadComponent: () => import('./pages/product-list-page/product-list-page'),
  },
  {
    path: 'new',
    title: 'Nuevo producto',
    loadComponent: () => import('./pages/product-form-page/product-form-page'),
  },
  {
    path: ':id/edit',
    title: 'Editar producto',
    loadComponent: () => import('./pages/product-form-page/product-form-page'),
  },
];

export default PRODUCTS_ROUTES;
