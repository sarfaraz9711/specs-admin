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

import { AuthGuard } from '../../../../core/admin/providers/auth.guard';
import { CartValueComponent } from './components/cartvalue/add/add.component';
import { ListComponent  } from './components/cartvalue/list/list.component';
import { PromotionsLayout } from './components/layout/layout.component';

const promotionsRoutes: Routes = [
  { path: '', redirectTo: "freeproducts" , pathMatch: 'full'},
  {
    path: '',
    component: PromotionsLayout,
    children: [
      // {
      //   path: 'contactus',
      //   loadChildren: () => import('./components/contactus/contactus.module').then(m => m.ContactUsFormModule),
      //   //canActivate: [AuthGuard],
      //   //data: { permissionForHeader: 'customers-customer', root: 'feedback' }
      // },
      {
        path: 'freeproducts',
        loadChildren: () => import('./components/freeproducts/freeproducts.module').then(m=> m.FreeProductsModule),
      },
      {
        path: 'coupon-based',
        loadChildren: () => import('./components/couponBased/couponBased.module').then(m=> m.CouponBasedModule),
      },
      {
        path: 'signup-coupons',
        loadChildren: () => import('./components/signupCoupon/signupCoupon.module').then(m=> m.SignupCouponBasedModule),
      },
      {
        path: 'discount-Products',
        loadChildren: () => import('./components/discountproducts/discountBased.module').then(m=> m.DiscountBasedModule),
      },
      {
        path: 'list', component: ListComponent,
        data: {
          urls: [{ title: 'Promotions', url: '' },
          { title: 'Cart-value', url: '' },
          { title: 'List', url: '' }]
        }
      },
      {
        path:"cart-value", component: CartValueComponent,
        data: {
          urls: [{ title: 'Promotions', url: '' },
          { title: 'Cart-value', url: '' },
          { title: 'Add', url: '' }]
        }
      },
      {
        path: 'edit/:id', component: CartValueComponent,
        data: {
          urls: [{ title: 'Promotions', url: '' },
          { title: 'Cart-value', url: '' },
          { title: 'Edit', url: '' }]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(promotionsRoutes)],
  exports: [RouterModule]
})
export class PromotionsRoutingModule {}
