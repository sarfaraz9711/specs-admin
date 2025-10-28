import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/core/admin/providers/auth.guard";
import { AddProductComponent } from "./add/add.component";
import { ListProductComponent } from "./list/list.component";

const discuntRoutes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {path: 'list', component: ListProductComponent,
    canActivate: [AuthGuard],
    data: {
        urls: [{ title: 'Promotions', url: '' },
      { title: 'Discount Products - Discount based', url: '' },
      { title: 'List', url: '' }]
    }

    },
    {path: 'add', component: AddProductComponent,
    canActivate: [AuthGuard],
    data: {
        urls: [{ title: 'Promotions', url: '' },
      { title: 'Discount Products - Discount based', url: '' },
      { title: 'Add', url: '' }]
    }

    }
    
];
@NgModule({
    imports: [RouterModule.forChild(discuntRoutes)],
    exports: [RouterModule]
  })
  export class DiscountBasedRoutingModule { }