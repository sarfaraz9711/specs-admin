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
import { ListComponent } from './components/franchise/list/list.component';
import { PublicFormsLayout } from './components/layout/layout.component';
import { EnquiryList } from './components/enquiry/list/list.component'
import { JoinOurTroopList } from './components/joinourtroop/list/list.component';


const customersRoutes: Routes = [
  { path: '', redirectTo: "contactus" , pathMatch: 'full'},
  
  {
    path: '',
    component: PublicFormsLayout,
    children: [
      {
        path: 'contactus',
        loadChildren: () => import('./components/contactus/contactus.module').then(m => m.ContactUsFormModule),
        //canActivate: [AuthGuard],
        //data: { permissionForHeader: 'customers-customer', root: 'feedback' }
      },
      {
        path: 'feedbacks',
        loadChildren: () => import('./components/feedback/feedback.module').then(m=> m.FeedbackModule),
      },
     {
      path: 'bannerswidgets',
      loadChildren: () => import('./components/bannerswidgets/banners.module').then(m => m.BannerModuleA)
     },
     {
      path: 'list', component: ListComponent,
      data: {
         urls: [{ title: 'Subscriptions', url: '' },
         { title: 'Franchise', url: '' },
         { title: 'List', url: '' }]
       }
     },
     {
      path: 'enquiry/list', component: EnquiryList,
      data: {
        urls: [{ title: 'Subscriptions', url: '' },
        { title: 'Corporate-gifting', url: '' },
        { title: 'List', url: '' }]
      }
     },
     {
      path: 'joinourtroop/list', component: JoinOurTroopList,
      data: {
        urls: [{ title: 'Subscriptions', url: '' },
        { title: 'Join-our-troop', url: '' },
        { title: 'List', url: '' }]
      }
     }
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule]
})
export class PublicFormsRoutingModule {}
