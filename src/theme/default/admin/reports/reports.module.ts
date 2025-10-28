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

// COMPONENTS

import { LayoutComponent } from './components/layout/layout.component';
import { ReportHeaderComponent } from './components/header/header.component';

import { ReportsRoutingModule } from './reports.routing';
import { ComponentsModule } from '../shared/components';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../admin.module';
import { HttpClient } from '@angular/common/http';
import { FacilityCodeComponent } from './facility-code/add/add.component';
import { ConfigrationFacilityCodeService } from 'src/core/admin/reports/configrationFacilityCode.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DeliveryTatComponent } from './delivery-tat/add/add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DeliveryTatService } from 'src/core/admin/reports/deliveryTat.service';
import { PopupMessageModule } from '../shared/model-popup/popup-message/popup-message.module';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';
import { OrderReportComponent } from './order-report/order-report.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { RemarkReportComponent } from './remark-report/remark-report.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ReportHeaderComponent,
    FacilityCodeComponent,
    DeliveryTatComponent,
    OrderReportComponent,
    PaymentReportComponent,
    RemarkReportComponent,
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PopupMessageModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [ConfigrationFacilityCodeService, DeliveryTatService, ExcelService],
})
export class ReportsModule { }
