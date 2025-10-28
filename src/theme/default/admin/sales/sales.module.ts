/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultCommonModule} from '../../default.common.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// components
import {SalesLayoutComponent} from './components/layout/layout.component';
import {SalesHeaderComponent} from './components/header/header.component';
// Routing Module
import {SalesRoutingModule} from './sales.routing';

// Shared Module
import {MaterialModule} from '../../default.material.module';
import {TranslateModule} from '@ngx-translate/core';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';


// Store Actions
import {EffectsModule} from '@ngrx/effects';
import {LayoutService} from '../../../../core/admin/sales/layout/layout.service';
import {LayoutsSandbox} from '../../../../core/admin/sales/layout/layout.sandbox';
import {LayoutEffects} from '../../../../core/admin/sales/layout/effects/layout.effect';
import {ComponentsModule} from '../shared/components';
import { ReturnOrderComponent } from './components/return-order/return-order.component';
import { PopupMessageModule } from '../shared/model-popup/popup-message/popup-message.module';
import { CreditNotesComponent } from './components/credit-notes/credit-notes.component';
import { CreateCreditNotesComponent } from './components/credit-notes/create/create-credit-notes.component';

@NgModule({
    declarations: [
        SalesLayoutComponent,
        SalesHeaderComponent,
        ReturnOrderComponent,
        CreditNotesComponent,
        CreateCreditNotesComponent
    ],
    imports: [
        CommonModule,
        SalesRoutingModule,
        DefaultCommonModule,
        MaterialModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([LayoutEffects]),
        TranslateModule.forChild(),
        PopupMessageModule
    ],
    providers: [
        LayoutService,
        LayoutsSandbox,
        ExcelService
    ],
    bootstrap: [],
    entryComponents: []
})

export class SalesModule {
}
