import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from './';
import { ItemHttpService } from './';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private itemHttpService: ItemHttpService) {}

  getAllItems(): Observable<Item[]> {
    return this.itemHttpService.getAllItems();
  }

  insert(item: Item): Observable<Item> {
    return this.itemHttpService.post(item);
  }

  update(item: Item): Observable<Item> {
    return this.itemHttpService.patch(item);
  }

  delete(id: string): Observable<Item> {
    return this.itemHttpService.delete(id);
  }
}
