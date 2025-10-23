import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { adminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'content',
        loadComponent: () =>
          import('./content-management/content-management.component').then(
            m => m.ContentManagementComponent
          ),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./messages/messages.component').then(m => m.MessagesComponent),
      },
    ],
  },
];
