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
}
