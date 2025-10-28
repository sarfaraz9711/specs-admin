import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/admin/providers/auth.guard';
import { ListComponent } from './list/list.component';


const bannersRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list', component: ListComponent,
    canActivate: [AuthGuard],
    data: {
     // permission: 'list-customer',
      urls: [{ title: 'Subscriptions', url: '' },
      { title: 'bannerwidget', url: '' },
      { title: 'List', url: '' }]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(bannersRoutes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }
