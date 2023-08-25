import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemService, ItemHttpService } from './shared';
import { ListItemsComponent } from './list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InsertItemComponent } from './insert-item/insert-item.component';

@NgModule({
  declarations: [ListItemsComponent, InsertItemComponent],
  imports: [CommonModule, FontAwesomeModule],
  providers: [ItemService, ItemHttpService],
})
export class ItemsModule {}
