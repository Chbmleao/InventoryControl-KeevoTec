import { Routes } from '@angular/router';

import { ListItemsComponent } from './list';

export const ItemRoutes: Routes = [
  {
    path: 'items',
    redirectTo: 'items/list',
  },
  {
    path: 'items/list',
    component: ListItemsComponent,
  },
];
