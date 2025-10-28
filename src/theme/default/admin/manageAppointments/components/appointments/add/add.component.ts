import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'app-store-add',
    templateUrl: 'add.component.html',
})
export class AddStoreComponent implements OnInit {
    appointmentForm!: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.appointmentForm = this.fb.group({
            calendarPeriod: [null],
            bookingNotAllowedDays: this.fb.array([]),
            saturdayOff: ['NO'],
            sundayOff: ['NO'],
            startTime: [''],
            endTime: ['']
        });
        this.addDate();
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

    onSubmit(): void {
        console.log('Form submitted:');
        console.log(JSON.stringify(this.appointmentForm.value, null, 2));
    }
}
