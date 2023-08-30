import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { Item, ItemService } from '../shared';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css'],
})
export class DeleteItemComponent {
  @Input() item: Item;
  @Output() closePageEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() closePageAndReloadEvent: EventEmitter<void> =
    new EventEmitter<void>();

  faTrash = faTrash;

  constructor(private itemService: ItemService) {}

  remove(): void {
    this.itemService.delete(this.item.id).subscribe(
      () => {
        console.log('Item deleted successfully');
        this.closePage(true);
      },
      (error) => {
        console.error('Error deleting item:', error);
      }
    );
  }

  closePage(reload: boolean): void {
    if (reload) {
      this.closePageAndReloadEvent.emit();
    } else {
      this.closePageEvent.emit();
    }
  }

  getEndOfString(str: string): string {
    return str.slice(-5);
  }
}
