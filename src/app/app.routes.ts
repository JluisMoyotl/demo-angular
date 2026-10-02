import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', loadChildren: () => import('./products/products.routes') },
  {
    path: '**',
    title: 'Página no encontrada',
    loadComponent: () => import('./core/not-found-page/not-found-page'),
  },
];
