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
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// components
import { StoresLayout } from './components/layout/layout.component';
import { StoresHeaderComponent } from './components/header/header.component';
// Routing Module
//import { CustomersRoutingModule } from './customers.routing';

// Shared Module
import { MaterialModule } from '../../default.material.module';
import { TranslateModule } from '@ngx-translate/core';

// Store Actions
import { EffectsModule } from '@ngrx/effects';
//import { LayoutService } from '../../../../core/admin/Customers/layout/layout.service';
import { LayoutService } from '../../../../core/admin/PublicForms/layout/layout.service';
//import { LayoutSandbox } from '../../../../core/admin/Customers/layout/layout.sandbox';
import { LayoutSandbox } from '../../../../core/admin/PublicForms/layout/layout.sandbox';
//import { LayoutEffects } from '../../../../core/admin/Customers/layout/effects/layout.effect';
import { LayoutEffects } from '../../../../core/admin/PublicForms/layout/effects/layout.effect';
//import { CustomersGroupEffects } from '../../../../core/admin/Customers/customers-group/customers-group-effects/customers-group.effects';
//import { CustomersGroupService } from '../../../../core/admin/Customers/customers-group/customers-group.service';
import {ComponentsModule} from '../shared/components';
import { ManageStoresRoutingModule } from './manage-stores.routing';

import { FranchiseService } from 'src/core/admin/PublicForms/franchise.service';




@NgModule({
  declarations: [
    StoresLayout,
    StoresHeaderComponent   
 
    

  ],
  imports: [
    CommonModule,
    ManageStoresRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    //PublicFormsRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([LayoutEffects]),
    TranslateModule.forChild(),
    ComponentsModule,
    
  ],
  providers: [LayoutService, LayoutSandbox, FranchiseService],
  bootstrap: [],
  entryComponents: []
})
export class ManageStores {}
