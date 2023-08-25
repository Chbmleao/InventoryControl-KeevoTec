import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Item } from '.';

@Injectable({
  providedIn: 'root',
})
export class ItemHttpService {
  private apiUrl = 'http://localhost:8000/items';

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}`);
  }
}
