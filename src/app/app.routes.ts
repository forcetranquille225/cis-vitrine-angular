import { Routes } from '@angular/router';
import { VISITOR_ROUTES } from './modules/visitor/visitor.routes';
import { ADMIN_ROUTES } from './modules/admin/admin.routes';
import { SUPER_ADMIN_ROUTES } from './modules/super-admin/super-admin.routes';

export const routes: Routes = [
  ...VISITOR_ROUTES,
  {
    path: 'admin',
    children: ADMIN_ROUTES,
  },
  {
    path: 'super-admin',
    children: SUPER_ADMIN_ROUTES,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
