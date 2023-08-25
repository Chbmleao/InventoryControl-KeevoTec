import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemService, ItemHttpService } from './shared';
import { ListItemsComponent } from './list';

@NgModule({
  declarations: [ListItemsComponent],
  imports: [CommonModule],
  providers: [ItemService, ItemHttpService],
})
export class ItemsModule {}
