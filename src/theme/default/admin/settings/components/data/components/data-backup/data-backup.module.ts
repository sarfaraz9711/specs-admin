import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataBackupComponent } from './data-backup.component';
import { DataBackupRoutingModule } from './data-backup.routing';



@NgModule({
  declarations: [
    DataBackupComponent
  ],
  imports: [
    CommonModule,
    DataBackupRoutingModule
  ]
})
export class DataBackupModule { }
