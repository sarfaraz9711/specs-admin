/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { FailedOrderListComponent } from './list/list.component';
import { ViewFailedOrdersComponent } from './vieworders/vieworders.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const orderRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: FailedOrderListComponent, canActivate: [AuthGuard],
    data: {
      permission: 'failed-order-list',
      urls: [{ title: 'Sales', url: '' },
      { title: 'Failed Order', url: '' },
      { title: 'List', url: '' }]
    },
  },
  {
    path: 'vieworder', component: ViewFailedOrdersComponent, canActivate: [AuthGuard],
    data: {
      permission: 'view-failed-order-detail',
      urls: [{ title: 'Sales', url: '' },
      { title: 'Falied Order', url: '' },
      { title: 'Details', url: '' }]
    }
  },
  {
    path: 'vieworder/:orderId',
    component: ViewFailedOrdersComponent, canActivate: [AuthGuard],
    data: {
      permission: 'view-failed-order-detail',
      urls: [{ title: 'Sales', url: '' },
      { title: 'Falied Order', url: '' },
      { title: 'Details', url: '' }]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export class FailedOrderRoutingModule { }
