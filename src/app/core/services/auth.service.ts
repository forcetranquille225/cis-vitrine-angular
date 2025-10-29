import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private userRoleKey = 'user_role';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  login(token: string, role: string) {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userRoleKey, role);
    }
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userRoleKey);
    }
  }

  isAuthenticated(): boolean {
    return this.isBrowser() ? !!localStorage.getItem(this.tokenKey) : false;
  }

  getRole(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.userRoleKey) : null;
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }
}
