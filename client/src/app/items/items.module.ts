import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemService, ItemHttpService } from './shared';
import { ListItemsComponent } from './list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InsertItemComponent } from './insert';

@NgModule({
  declarations: [ListItemsComponent, InsertItemComponent],
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  providers: [ItemService, ItemHttpService],
})
export class ItemsModule {}
