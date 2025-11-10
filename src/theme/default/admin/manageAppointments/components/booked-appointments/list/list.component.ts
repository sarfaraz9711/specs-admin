import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ExcelService } from 'src/core/admin/PublicForms/excel.service';
import { AppointmentsService } from 'src/core/admin/appointments/appointment.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contactus-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  appointments: any[] = [];
  customers: any[] = [];
  selectedCustomer: any = null;
  selectedDate: string = '';

  constructor(
    private http: HttpClient,
    private route: Router,
    private excelService: ExcelService,
    private _appointmentsService: AppointmentsService
  ) { }

  ngOnInit(): void {
     this.agentcustomerList();
  }
  onStartDateSelect(event: any) {
    this.selectedDate = event.target.value;
  }
  applyFilter() {
    this.loadAppointments(this.selectedDate);
  }
  reset() {
    this.selectedDate = '';
    this.agentcustomerList();
  }

    agentcustomerList() {
    const param: any = {
      limit: '100',
      offset: '',
      name: '',
      email: '',
      customerGroup: '',
      customerGroupNam: '',
      date: '',
      count: '',
      status: '',
      customerType:2
    };

    this._appointmentsService.customersList(param).subscribe({
      next: (res: any) => {
        if (res && res.status === 1 && res.data) {
           this.customers = res.data;
           this.loadAppointments();
        } else {
          this.customers = [];
        }
      },
      error: (err) => {
        console.error('API Error loading customers:', err);
        this.customers = [];
      }
    });
  }

   
  loadAppointments(date?: string) {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    const payload = {
      isActive: 1,
      appointmentDate: date || formattedCurrentDate
    };

    this._appointmentsService.bookedAppointments(payload).subscribe({
      next: (res: any) => {
        if (res && res.status === 200 && res.data) {
          this.appointments = res.data.map((app: any) => {
             const agentId = app.agentId || app.customerId || '';
             app.selectedCustomerId = agentId ? agentId.toString() : '';
             const matchedAgent = this.customers.find(
              (cust) => cust.id.toString() === app.selectedCustomerId
            );

            app.agentName = matchedAgent ? matchedAgent.firstName : '';

            return app;
          });
        } else {
          this.appointments = [];
        }
      },
      error: (err) => {
        console.error('API Error loading appointments:', err);
        this.appointments = [];
      }
    });
  }

  onCustomerSelect(appointment: any) {
     this.selectedCustomer = appointment;
  }

  updateCustomer(appointment: any) {
    if (!appointment.selectedCustomerId) {
      console.error('No agent selected!');
      return;
    }

    const payload = {
      id: appointment.id,
      agentId: appointment.selectedCustomerId
    };

    console.log('Payload to assign agent:', payload);

    this._appointmentsService.assignCustomerToAppointment(payload).subscribe({
      next: (res: any) => {
        console.log('Agent assigned successfully:', res);
        appointment.agentId = appointment.selectedCustomerId;

        const matchedAgent = this.customers.find(
          (cust) => cust.id.toString() === appointment.selectedCustomerId.toString()
        );

        if (matchedAgent) {
          appointment.agentName = matchedAgent.firstName;
        }
      },
      error: (err) => {
        console.error('Error assigning agent:', err);
      }
    });
  }
}

