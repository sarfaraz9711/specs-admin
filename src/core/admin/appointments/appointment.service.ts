
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Api } from "../providers/providers";


@Injectable()

export class AppointmentsService extends Api {
    sendEditId = new BehaviorSubject(0)
    params: any = {};
    private URL = this.getBaseUrl();

    appointmentList() {
        return this.http.get(this.URL + '/appointment/get-appointment-list');
    }

    addAppointments(payload: any) {
        return this.http.post(this.URL + '/appointment/save', payload);
    }

    updateAppointments(payload: any) {
        return this.http.post(this.URL + '/appointment/update', payload);
    }

    getAppointmentById(id: number) {
        return this.http.get(this.URL + `/appointment/get-appointment-list?id=${id}`);
    }

    bookedAppointments(payload: any) {
        return this.http.post(this.URL + '/book-appointment/get-all-appointment', payload);
    }

    customersList(params: any) {
        return this.http.get(this.URL + '/customer/customerlist', {
            params: params
        });
    }

    assignCustomerToAppointment(payload: any) {
        return this.http.post(this.URL + '/book-appointment/update-appointment', payload);
    }


}