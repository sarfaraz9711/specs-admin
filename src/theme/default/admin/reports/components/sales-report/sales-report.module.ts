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

import { SalesReportRoutingModule } from './sales-report.routing';
import { SalesReportListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { MaterialModule } from 'src/theme/default/default.material.module';
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// STATE MANAGEMENT MODULES

import { EffectsModule } from '@ngrx/effects';
import { SalesReportEffect } from '../../../../../../core/admin/reports/sales-report/effects/sales-report.effect';
import { SalesReportSandbox } from '../../../../../../core/admin/reports/sales-report/sales-report.sandbox';
import { SalesReportService } from '../../../../../../core/admin/reports/sales-report/sales-report.service';



@NgModule({
  declarations: [SalesReportListComponent],
  imports: [
    CommonModule,
    SalesReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    NgbModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    EffectsModule.forFeature([
      SalesReportEffect
    ])
  ],
  providers: [
    SalesReportSandbox,
    SalesReportService
  ]
})
export class SalesReportModule { }
