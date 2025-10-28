import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StoresService } from 'src/core/admin/stores/stores.service';
import { ExcelService } from 'src/core/admin/PublicForms/excel.service';

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
    private _storesService: StoresService,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.http.get<any[]>('http://localhost:3000/appointments')
      .subscribe(data => this.appointments = data);

  }

  addStore() {
    this.route.navigate(['/manage-appointments/appointments/add']);
  }
}
