import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Observable } from 'rxjs';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ItemService, Item } from '../shared';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

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

  remove($event: any, item: Item): void {
    $event.preventDefault();

    if (confirm('Do you want to remove "' + item.description + '" item?')) {
      this.itemService.delete(item.id).subscribe(
        () => {
          console.log('Item deleted successfully');
          this.items$ = this.getAll();
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
    }
  }

  closeItemPages(): void {
    this.showInsertItemPage = false;
    this.showEditItemPage = false;
    this.showDeleteItemPage = false;

    this.items$ = this.getAll();
  }

  openEditItemPage(itemId: string) {
    this.showEditItemPage = true;
    this.editItemId = itemId;
  }

  openDeleteItemPage(item: Item) {
    this.showDeleteItemPage = true;
    this.deleteItem = item;
  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);

    this.copiedItemId = text;
    setTimeout(() => {
      this.copiedItemId = null;
    }, 3000);
  }
}
