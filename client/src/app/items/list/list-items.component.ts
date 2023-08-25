import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { ItemService, Item } from '../shared';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.items$ = this.getAll();
  }

  getAll(): Observable<Item[]> {
    return this.itemService.getAllItems();
  }
}
