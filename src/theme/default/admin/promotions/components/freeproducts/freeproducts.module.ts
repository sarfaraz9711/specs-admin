import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FreeProductsRoutingModule } from './freeproducts-routing.module';
import { ListComponent } from './list/list.component';
import { FreeProductsLayoutComponent } from '../shared/freeproducts-layout/freeproducts-layout.component';
import { MaterialModule } from '../../../../default.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FreeProductPromoAddComponent } from './add/add.component';
import { FreeProductPromtionService} from '../../../../../../core/admin/Promotions/freeproductspromotions.service'
import { PopupMessageModule } from '../../../shared/model-popup/popup-message/popup-message.module';

@NgModule({
  declarations: [
    ListComponent,
   // FreeProductsLayoutComponent,
    FreeProductPromoAddComponent
  ],
  imports: [
    CommonModule,
    FreeProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    PopupMessageModule
    // EffectsModule.forFeature([FeedbackEffect])
  ],

  // providers: [FeedbackService, FeedbackSandbox],
  providers: [DatePipe, FreeProductPromtionService],
  bootstrap: [],

})
export class FreeProductsModule { }
