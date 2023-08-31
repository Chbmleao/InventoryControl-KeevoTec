import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Observable } from 'rxjs';
import {
  faPenToSquare,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import { ItemService, Item } from '../shared';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faPlus = faPlus;

  showInsertItemPage = false;
  showEditItemPage = false;
  showDeleteItemPage = false;
  editItemId = '';
  deleteItem = new Item('', '', 0, '');
  copiedItemId: string | null = null;

  items$: Observable<Item[]>;

  constructor(private itemService: ItemService, private clipboard: Clipboard) {}

  ngOnInit(): void {
    this.items$ = this.getAll();
  }

  getAll(): Observable<Item[]> {
    return this.itemService.getAllItems();
  }

  closeItemPages(reload: boolean): void {
    this.showInsertItemPage = false;
    this.showEditItemPage = false;
    this.showDeleteItemPage = false;

    if (reload) {
      this.items$ = this.getAll();
    }
  }

  openEditItemPage(itemId: string): void {
    this.showEditItemPage = true;
    this.editItemId = itemId;
  }

  openDeleteItemPage(item: Item): void {
    this.showDeleteItemPage = true;
    this.deleteItem = item;
  }

  copyToClipboard(text: string): void {
    this.clipboard.copy(text);

    this.copiedItemId = text;
    setTimeout(() => {
      this.copiedItemId = null;
    }, 3000);
  }

  divideInHalf(text: string) {
    const half = Math.floor(text.length / 2);
    const firstPart = text.slice(0, half);
    const secondPart = text.slice(half);

    return {
      firstPart,
      secondPart,
    };
  }
}
