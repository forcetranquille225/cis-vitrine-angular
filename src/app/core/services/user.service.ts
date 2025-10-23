import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private api: ApiService) {}

  getProfile() {
    return this.api.get<User>('users/me');
  }

  updateProfile(data: Partial<User>) {
    return this.api.put<User>('users/me', data);
  }

  listAdmins() {
    return this.api.get<User[]>('users/admins');
  }
}
