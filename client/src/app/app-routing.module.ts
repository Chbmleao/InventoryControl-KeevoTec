import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemRoutes } from './items';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/items/list',
    pathMatch: 'full',
  },
  ...ItemRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
