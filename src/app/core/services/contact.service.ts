import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private apiService: ApiService) {}

  submitContact(contactData: ContactData): Observable<ContactResponse> {
    return this.apiService.post<ContactResponse>('contact', contactData);
  }

  getContacts(): Observable<ContactResponse[]> {
    return this.apiService.get<ContactResponse[]>('contact');
  }

  getContactById(id: string): Observable<ContactResponse> {
    return this.apiService.get<ContactResponse>(`contact/${id}`);
  }
}
