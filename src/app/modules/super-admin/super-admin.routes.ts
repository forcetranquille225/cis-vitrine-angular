import { Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from '../../layouts/super-admin-layout/super-admin-layout.component';
import { superAdminGuard } from '../../core/guards/super-admin.guard';

export const SUPER_ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: SuperAdminLayoutComponent,
    canActivate: [superAdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'users-management',
        pathMatch: 'full',
      },
      {
        path: 'users-management',
        loadComponent: () =>
          import('./users-management/users-management.component').then(
            m => m.UsersManagementComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then(m => m.SettingsComponent),
      },
    ],
  },
];
