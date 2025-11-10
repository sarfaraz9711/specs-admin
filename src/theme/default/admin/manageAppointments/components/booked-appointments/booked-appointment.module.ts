
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { ComponentsModule } from '../../../shared/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/core/admin/PublicForms/excel.service';
import { AppointmentsService } from 'src/core/admin/appointments/appointment.service';
import { ListComponent } from './list/list.component';
import { BookedAppointmentsRoutingModule } from './booked-appointment.routing';

@NgModule({
  declarations: [
    ListComponent,
   
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    SelectDropDownModule,
    BookedAppointmentsRoutingModule,
    NgbModule,
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
    AppointmentsService,
    ExcelService,
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'check' }
  ],
  bootstrap: [],
 })
export class BookedAppointmentsModule { } 
