import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { ListComponent } from './list/list.component';
import {FeedbackLayoutComponent} from '../shared/feedback-layout/feedback-layout.component';

//Store Actions
import { EffectsModule } from '@ngrx/effects';
import { FeedbackSandbox} from '../../../../../../core/admin/PublicForms/feedback/feedback.sandbox';
import { FeedbackService} from '../../../../../../core/admin/PublicForms/feedback/feedback.service';
import { FeedbackEffect} from '../../../../../../core/admin/PublicForms/feedback/feedback-effect/feedback.effect';
import { ExcelService } from 'src/core/admin/PublicForms/excelfeedback.service';

@NgModule({
  declarations: [
    ListComponent,
    FeedbackLayoutComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    EffectsModule.forFeature([FeedbackEffect])
  ],
  
  providers: [FeedbackService, FeedbackSandbox, ExcelService],
  bootstrap: [],

})
export class FeedbackModule { }
