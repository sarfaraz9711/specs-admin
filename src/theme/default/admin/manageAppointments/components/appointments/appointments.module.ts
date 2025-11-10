
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


// Routing Module
import { AppointmentsRoutingModule } from './appointments.routing';

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
import { AddStoreComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ExcelService } from 'src/core/admin/PublicForms/excel.service';
import { AppointmentsService } from 'src/core/admin/appointments/appointment.service';

@NgModule({
  declarations: [
    ListComponent,
   AddStoreComponent
   
  ],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    AppointmentsRoutingModule,
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
    AppointmentsService,
    ExcelService,
    { provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: 'check' }
  ],
  bootstrap: [],
 // entryComponents: [CustomerAddressComponent]
})
export class AppointmentsModule { } 
