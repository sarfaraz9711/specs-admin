/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RatingReviewListComponent } from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';


const rating_reviewRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: RatingReviewListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-rating-review',
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Ratings & Reviews', url: '' },
      { title: 'List', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(rating_reviewRoutes)],
  exports: [RouterModule]
})
export class RatingReviewRoutingModule { }
