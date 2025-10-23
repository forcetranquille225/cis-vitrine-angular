import { Routes } from '@angular/router';
import { VISITOR_ROUTES } from './modules/visitor/visitor.routes';

export const routes: Routes = [
  ...VISITOR_ROUTES,
  // Les routes admin et super-admin viendront plus tard
];
