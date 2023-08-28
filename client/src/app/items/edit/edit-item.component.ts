import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item, ItemService } from '../shared';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  @ViewChild('formItem') formItem: NgForm;
  @Input() editItemId: string;
  @Output() closePageEvent: EventEmitter<void> = new EventEmitter<void>();

  item: Item;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.item = new Item('', '', 0, '');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editItemId) {
      this.updateItem();
    }
  }

  edit(): void {
    if (this.formItem.form.valid) {
      this.itemService.update(this.item).subscribe(
        () => {
          console.log('Item updated successfully');
          this.closePage();
        },
        (error) => {
          console.error('Error updating item:', error);
        }
      );
    }
  }

  closePage(): void {
    this.closePageEvent.emit();
  }

  private updateItem(): void {
    if (this.editItemId) {
      this.itemService.getItemById(this.editItemId).subscribe(
        (item) => {
          console.log('Item got successfully');
          this.item = item;
        },
        (error) => {
          console.error('Error getting item:', error);
        }
      );
    }
  }
}
