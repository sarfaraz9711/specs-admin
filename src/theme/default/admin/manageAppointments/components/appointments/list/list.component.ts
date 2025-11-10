import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/core/admin/PublicForms/excel.service';
import { AppointmentsService } from 'src/core/admin/appointments/appointment.service';

@Component({
  selector: 'app-contactus-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  appointments: any[] = [];

  constructor(
    private http: HttpClient,
    private route: Router,
    private excelService: ExcelService,
    private _appointmentsService: AppointmentsService,

  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this._appointmentsService.appointmentList().subscribe({
      next: (res: any) => {
        if (res && res.status === 200 && res.data) {
          this.appointments = [res.data];
        } else {
          this.appointments = [];
        }
      },
      error: (err) => {
        this.appointments = [];
      }
    });
  }
  addStore() {
    this.route.navigate(['/manage-appointments/appointments/add']);
  }
}
