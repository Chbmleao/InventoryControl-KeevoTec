import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ItemService, Item } from '../shared';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items$ = this.getAll();
    console.log(this.items$);
  }

  getAll(): Observable<Item[]> {
    return this.itemService.getAllItems();
  }
}
