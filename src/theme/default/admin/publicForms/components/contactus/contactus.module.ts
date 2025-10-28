/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
//import { CustomerAddComponent } from './add/add.component';
// import { ContactUsListComponent, ListComponent } from './list/list.component';
//import { CustomerViewComponent } from './view/view.component';
//import { CustomerAddressComponent } from './address/address.component';
//import { CustomerFilterComponent } from './filter/filter.component';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { CustomersApiClientService } from '../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { Customereffects } from '../../../../../../core/admin/Customers/customers/customer-effects/customer.effects';
import { CustomerSandbox } from '../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersGroupSandbox } from '../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { CustomersGroupService } from '../../../../../../core/admin/Customers/customers-group/customers-group.service';

// Routing Module
import { ContactUsRoutingModule } from './contactus.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ContactusLayoutComponent} from "../shared/contactus-layout/contactus-layout.component"
import { ContactUsService } from 'src/core/admin/PublicForms/contactUs.service';
import { ListComponent } from './list/list.component';
import { ExcelService } from 'src/core/admin/PublicForms/excel.service';

@NgModule({
  declarations: [
    ListComponent,
   ContactusLayoutComponent
   
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    ContactUsRoutingModule,
    SelectDropDownModule,
    NgbModule,
   // EffectsModule.forFeature([Customereffects]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule
  ],
  providers: [
    ContactUsService,
    ExcelService,
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'check' }
  ],
  bootstrap: [],
 // entryComponents: [CustomerAddressComponent]
})
export class ContactUsFormModule {}
