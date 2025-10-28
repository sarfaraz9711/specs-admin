
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppointmentsLayout } from './components/layout/layout.component';
import { AppointmentsHeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../../default.material.module';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { LayoutService } from '../../../../core/admin/PublicForms/layout/layout.service';
import { LayoutSandbox } from '../../../../core/admin/PublicForms/layout/layout.sandbox';
import { LayoutEffects } from '../../../../core/admin/PublicForms/layout/effects/layout.effect';
import {ComponentsModule} from '../shared/components';
import { ManageAppointmentsRoutingModule } from './manage-appointments.routing';

import { FranchiseService } from 'src/core/admin/PublicForms/franchise.service';




@NgModule({
  declarations: [
    AppointmentsLayout,
    AppointmentsHeaderComponent   
  ],
  imports: [
    CommonModule,
    ManageAppointmentsRoutingModule,
    DefaultCommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([LayoutEffects]),
    TranslateModule.forChild(),
    ComponentsModule,
    
  ],
  providers: [LayoutService, LayoutSandbox, FranchiseService],
  bootstrap: [],
  entryComponents: []
})
export class ManageAppointments {}
