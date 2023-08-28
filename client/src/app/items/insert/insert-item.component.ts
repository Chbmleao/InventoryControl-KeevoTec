import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { ItemService, Item } from '../shared';

@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css'],
})
export class InsertItemComponent implements OnInit {
  @Output() closePageEvent: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('formItem', { static: true }) formItem: NgForm;
  item: Item;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.item = new Item('', '', 0, '');
  }

  insert(): void {
    if (this.formItem.form.valid) {
      this.itemService.insert(this.item).subscribe(
        () => {
          console.log('Item inserted successfully');
          this.closePage();
        },
        (error) => {
          console.error('Error deleting item:', error);
        }
      );
    }
  }

  closePage(): void {
    this.closePageEvent.emit();
  }
}
