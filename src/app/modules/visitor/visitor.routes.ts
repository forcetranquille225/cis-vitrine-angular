import { Routes } from '@angular/router';
import { VisitorLayoutComponent } from '../../layouts/visitor-layout/visitor-layout.component';
import { HomeComponent } from './home/home.component';

// Tu pourras ajouter About, Services et Contact au fur et à mesure
export const VISITOR_ROUTES: Routes = [
  {
    path: '',
    component: VisitorLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'about',
        loadComponent: () =>
          import('./about/about.component').then(m => m.AboutComponent),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./services/services.component').then(m => m.ServicesComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./contact/contact.component').then(m => m.ContactComponent),
      },
      {
        path: 'legal',
        loadComponent: () =>
          import('./legal/legal.component').then(m => m.LegalComponent),
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./privacy/privacy.component').then(m => m.PrivacyComponent),
      },
    ],
  },
];
