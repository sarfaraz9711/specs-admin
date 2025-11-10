import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { AppointmentsService } from "src/core/admin/appointments/appointment.service";

@Component({
    selector: 'app-store-add',
    templateUrl: 'add.component.html',
})
export class AddStoreComponent implements OnInit {
    appointmentForm!: FormGroup;
    isEdit: boolean = false;
    appointmentEditId: number;

    constructor(
        private fb: FormBuilder,
        private _appointmentsService: AppointmentsService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.initForm();
        this._appointmentsService.sendEditId.subscribe(id => {
            if (id && id !== 0) {
                this.isEdit = true;
                this.appointmentEditId = id;
                this.getAppointmentDetails(id);
            }
        });
        this.addDate();
    }

    initForm() {
        this.appointmentForm = this.fb.group({
            calendarPeriod: [null],
            bookingNotAllowedDays: this.fb.array([]),
            saturdayOff: ['NO'],
            sundayOff: ['NO'],
            startTime: [''],
            endTime: ['']
        });
    }

    get bookingNotAllowedDays(): FormArray {
        return this.appointmentForm.get('bookingNotAllowedDays') as FormArray;
    }

    addDate(): void {
        this.bookingNotAllowedDays.push(this.fb.control(''));
    }

    removeDate(index: number): void {
        this.bookingNotAllowedDays.removeAt(index);
    }

    getAppointmentDetails(id: number) {
        this._appointmentsService.getAppointmentById(id).subscribe((res: any) => {
            if (res && res.status === 200 && res.data) {
                const data = res.data;
                this.appointmentForm.patchValue({
                    calendarPeriod: data.calendarPeriod,
                    saturdayOff: data.saturdayOff,
                    sundayOff: data.sundayOff,
                    startTime: data.startTime,
                    endTime: data.endTime
                });
                this.bookingNotAllowedDays.clear();

                if (data.bookingNotAllowedDays) {
                    const datesArray = data.bookingNotAllowedDays.split(',');
                    datesArray.forEach((date: string) => {
                        this.bookingNotAllowedDays.push(this.fb.control(date));
                    });
                }
            }
        }, err => {
            console.error('Error fetching appointment details:', err);
        });
    }

    onSubmit(): void {
        const formValue = { ...this.appointmentForm.value };
        formValue.bookingNotAllowedDays = formValue.bookingNotAllowedDays
            .filter((d: string) => d)
            .join(',');
        if (this.isEdit) {
            formValue.id = this.appointmentEditId;
            this.updateAppointment(formValue);
        } else {
            this.saveAppointment(formValue);
        }
    }

    saveAppointment(payload: any): void {
        this._appointmentsService.addAppointments(payload).subscribe({
            next: res => {
                console.log('Saved:', res);
                this._appointmentsService.sendEditId.next(null);
                this._router.navigate(['/manage-appointments/appointments/list']);
            },
            error: err => {
                console.error('Save error:', err);
            }
        });
    }

    updateAppointment(payload: any): void {
        this._appointmentsService.updateAppointments(payload).subscribe({
            next: res => {
                console.log('Updated:', res);
                this._appointmentsService.sendEditId.next(null);
                this._router.navigate(['/manage-appointments/appointments/list']);
            },
            error: err => {
                console.error('Update error:', err);
            }
        });
    }
    onCancel(): void {
        this._router.navigate(['/manage-appointments/appointments/list']);
    }
}

