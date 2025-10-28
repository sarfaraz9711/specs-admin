import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { ListComponent } from './list/list.component';
import { AddComponent} from './add/add.component';


const freeProductsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: ListComponent,
    canActivate: [AuthGuard],
    data: {
     // permission: 'list-customer',
      urls: [{ title: 'Promotions', url: '' },
      { title: 'Cart Value - Coupon based', url: '' },
      { title: 'List', url: '' }]
    }
  },
  {
    path: 'add', component: AddComponent,
    canActivate: [AuthGuard],
    data: {
     // permission: 'create-coupon',
      urls: [{ title: 'Promotions', url: '' },
      { title: 'Cart Value - Coupon based', url: '' },
      { title: 'Add', url: '' }]
    }
  },

  {
    path: 'edit/:id', component: AddComponent,
    canActivate: [AuthGuard],
    data: {
     // permission: 'create-coupon',
      urls: [{ title: 'Promotions', url: '' },
      { title: 'Cart Value - Coupon based', url: '' },
      { title: 'Update', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(freeProductsRoutes)],
  exports: [RouterModule]
})
export class CouponBasedRoutingModule { }
