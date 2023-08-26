import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ItemService, Item } from '../shared';

@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css'],
})
export class InsertItemComponent implements OnInit {
  @ViewChild('formItem', { static: true }) formItem: NgForm;
  item: Item;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.item = new Item('', '', 0, '');
  }

  insert(): void {
    if (this.formItem.form.valid) {
      this.itemService.insert(this.item);
    }
  }
}
