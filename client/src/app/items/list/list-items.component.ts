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
}
