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
import { SignUpPromoComponent } from './signupPromo.component';

const seoRoutes: Routes = [{ path: '', component: SignUpPromoComponent }];

@NgModule({
  imports: [RouterModule.forChild(seoRoutes)],
  exports: [RouterModule]
})
export class SeoRouting {}
