import { NgModule } from "@angular/core";
import { AddProductComponent } from "./add/add.component";
import { CommonModule } from "@angular/common";
import { DiscountBasedRoutingModule } from "./discountBased.rounting";
import { ListProductComponent } from "./list/list.component";
import { DiscountProductPromtionService } from "src/core/admin/Promotions/discountvalue.service";
import { PopupMessageModule } from "../../../shared/model-popup/popup-message/popup-message.module";

@NgModule({
    declarations: [
        ListProductComponent,
        AddProductComponent
    ],
    imports: [
        CommonModule,
        DiscountBasedRoutingModule,
        PopupMessageModule
    ],
    providers: [DiscountProductPromtionService],
    bootstrap: [],

})
export class DiscountBasedModule { }