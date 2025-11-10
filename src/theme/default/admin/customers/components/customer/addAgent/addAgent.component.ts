import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersApiClientService } from 'src/core/admin/Customers/customers/customer.ApiClient.service';

@Component({
    selector: 'app-customer-add',
    templateUrl: './addAgent.component.html',
    styleUrls: ['./addAgent.component.scss']
})
export class CustomerAddAgentComponent implements OnInit {
    customerForm: FormGroup;
    submitted = false;
    fieldTextType = false;
    repeatFieldTextType = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private apiService: CustomersApiClientService
    ) { }

    ngOnInit(): void {
        this.initForm();
    }

     initForm(): void {
        this.customerForm = this.fb.group({
            name: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, Validators.minLength(10)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmpassword: ['', [Validators.required]],
            status: [1, [Validators.required]]
        }, { validator: this.matchingPasswords('password', 'confirmpassword') });
    }

     matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup) => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                confirmPassword.setErrors({ mismatchedPasswords: true });
            } else {
                confirmPassword.setErrors(null);
            }
        };
    }

     onSubmit(): void {
        this.submitted = true;

        if (this.customerForm.invalid) return;

        const payload = {
            name: this.customerForm.value.name,
            lastName: this.customerForm.value.lastname,
            emailId: this.customerForm.value.email,
            password: this.customerForm.value.password,
            confirmPassword: this.customerForm.value.confirmpassword,
            phoneNumber: this.customerForm.value.mobile,
            customerType: this.customerForm.value.status
        };

        this.apiService.agentregister(payload).subscribe({
            next: (res: any) => {
                if (res?.status) {
                    console.log('Agent Registered Successfully!');
                    this.router.navigate(['/customers/customer']);
                } else {
                    console.log('Something went wrong.');
                }
            },
            error: (err) => {
                console.error('API Error:', err);
            }
        });
    }

     toggleFieldTextType(): void {
        this.fieldTextType = !this.fieldTextType;
    }

    toggleRepeatFieldTextType(): void {
        this.repeatFieldTextType = !this.repeatFieldTextType;
    }

     cancel(): void {
        this.router.navigate(['/customers/customer']);
    }
}
