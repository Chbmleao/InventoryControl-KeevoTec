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
  @Output() closePageAndReloadEvent: EventEmitter<void> =
    new EventEmitter<void>();

  @ViewChild('formItem', { static: true }) formItem: NgForm;
  item: Item;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.item = new Item('', '', 0, '');
  }

  async insert() {
    if (this.formItem.form.valid) {
      let existingId = '';

      try {
        const items = await this.itemService.getAllItems().toPromise();

        items.forEach((item) => {
          if (item.description === this.item.description) {
            existingId = item.id;
          }
        });
      } catch (error) {
        console.error('Error getting items:', error);
      }

      if (existingId) {
        if (
          confirm(
            `Já existe um item com a descrição "${this.item.description}", você quer substituí-lo com os dados informados?`
          )
        ) {
          const updatedItem = this.item;
          updatedItem.id = existingId;

          this.itemService.update(updatedItem).subscribe(
            () => {
              console.log('Item updated successfully');
              this.closePage(true);
            },
            (error) => {
              console.error('Error updating item:', error);
            }
          );
        } else {
          this.insertAux();
        }
      } else {
        this.insertAux();
      }
    }
  }

  insertAux() {
    this.itemService.insert(this.item).subscribe(
      () => {
        console.log('Item inserted successfully');
        this.closePage(true);
      },
      (error) => {
        console.error('Error inserting item:', error);
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
}
