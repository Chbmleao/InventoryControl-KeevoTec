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
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItemById(id: string): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  post(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  patch(item: Item): Observable<Item> {
    const url = `${this.apiUrl}/${item.id}`;

    const patchData = {
      description: item.description,
      quantity: item.quantity,
      measureUnit: item.measureUnit,
    };

    return this.http.patch<Item>(url, patchData);
  }

  delete(id: string): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Item>(url);
  }
}
