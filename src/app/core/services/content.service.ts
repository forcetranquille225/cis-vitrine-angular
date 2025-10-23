import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Content } from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  constructor(private api: ApiService) {}

  listContents() {
    return this.api.get<Content[]>('contents');
  }

  createContent(data: Content) {
    return this.api.post<Content>('contents', data);
  }

  updateContent(id: number, data: Partial<Content>) {
    return this.api.put<Content>(`contents/${id}`, data);
  }

  deleteContent(id: number) {
    return this.api.delete(`contents/${id}`);
  }
}
