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
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

// Component
import { CouponAddComponent } from './add/add.component';
import { CouponListComponent } from './list/list.component';

const couponRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: CouponListComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'list-coupon',
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Coupon', url: '' },
      { title: 'List', url: '' }]
    }
  },
  {
    path: 'add', component: CouponAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'create-coupon',
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Coupon', url: '' },
      { title: 'Add', url: '' }]
    }
  },
  {
    path: 'edit/:id',
    component: CouponAddComponent,
    canActivate: [AuthGuard],
    data: {
      permission: 'edit-coupon',
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Coupon', url: '' },
      { title: 'Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(couponRoutes)],
  exports: [RouterModule]
})
export class CouponRoutingModule { }
