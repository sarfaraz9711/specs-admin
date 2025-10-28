import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmtpComponent } from './smtp/smtp.component';

const smtpRoutes: Routes = [{ path: '', component: SmtpComponent }];

@NgModule({
  imports: [RouterModule.forChild(smtpRoutes)],
  exports: [RouterModule]
})
export class SmtpRoutingModule { }
