import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { ListComponent } from './list/list.component';


const signupCouponsRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: ListComponent,
    canActivate: [AuthGuard],
    data: {
     // permission: 'list-customer',
      urls: [{ title: 'Promotions', url: '' },
      { title: 'Sign up Coupons', url: '' },
      { title: 'List', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(signupCouponsRoutes)],
  exports: [RouterModule]
})
export class SignupCouponBasedRoutingModule { }
