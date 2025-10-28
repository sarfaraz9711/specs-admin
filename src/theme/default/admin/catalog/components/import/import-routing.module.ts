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
import { BulkProductUploadComponent } from './import-products/bulk-product-upload.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
import { UpdateProductComponent } from './update-product/update-product.component';



const couponRoutes: Routes = [
  { path: '', redirectTo: 'import-products', pathMatch: 'full' },
  {
    path: 'import-products', component: BulkProductUploadComponent,
    canActivate: [AuthGuard],
    data: {
      urls: [{ title: 'Catalog', url: '' },
      { title: 'Import', url: '' },
      { title: 'Bulk Upload', url: '' }]
    }
  },
  { path: 'update-product',component: UpdateProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(couponRoutes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
