import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsComponent } from './sms.component';

const smsRoutes: Routes = [{ path: '', component: SmsComponent }];

@NgModule({
  imports: [RouterModule.forChild(smsRoutes)],
  exports: [RouterModule]
})
export class SmsRoutingModule { }
