import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private userRoleKey = 'user_role';

  login(token: string, role: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userRoleKey, role);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userRoleKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.userRoleKey);
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }
}
