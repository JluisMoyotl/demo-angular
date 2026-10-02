import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Product data changes at runtime, so these pages are rendered in the browser.
  {
    path: 'products',
    renderMode: RenderMode.Client,
  },
  {
    path: 'products/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
