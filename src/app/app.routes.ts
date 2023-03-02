import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    title: 'Home',
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.page'),
  },
];
