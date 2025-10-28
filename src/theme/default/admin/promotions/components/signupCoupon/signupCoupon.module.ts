import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SignupCouponBasedRoutingModule } from './signupCoupon.routing';
import { ListComponent } from './list/list.component';
//import { FreeProductsLayoutComponent } from '../shared/freeproducts-layout/freeproducts-layout.component';

import { MaterialModule } from '../../../../default.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CouponBasedPromotionService} from '../../../../../../core/admin/Promotions/couponBased.service'
import { PopupMessageModule } from '../../../shared/model-popup/popup-message/popup-message.module';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';
@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SignupCouponBasedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PopupMessageModule
    // EffectsModule.forFeature([FeedbackEffect])
  ],

  // providers: [FeedbackService, FeedbackSandbox],
  providers: [DatePipe, CouponBasedPromotionService, ExcelService],
  bootstrap: [],

})
export class SignupCouponBasedModule { }
