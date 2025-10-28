import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmtpRoutingModule } from './smtp.routing';
import { SmtpComponent } from './smtp/smtp.component';


@NgModule({
  declarations: [
    SmtpComponent
  ],
  imports: [
    CommonModule,
    SmtpRoutingModule
  ]
})
export class SmtpModule { }
