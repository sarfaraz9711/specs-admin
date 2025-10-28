/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthSandbox } from '../../../../../core/admin/auth/auth.sandbox';
import { LayoutSandbox } from '../../../../../core/admin/layout/layout.sandbox';
import {AuthService} from '../../../../../core/admin/auth/auth.service'
@Component({
  selector: 'app-spurt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public userName: FormControl;
  public password: FormControl;
  public emailPattern = '[a-zA-Z0-9.-_\-\._]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public ifSubmitted = false;
  public badResponse = false;
  public subscriptions: Array<Subscription> = [];
  public repeatFieldTextType: boolean;
public captchaData: any = {};

  constructor(public _authSerive: AuthService, public fb: FormBuilder, public authSandbox: AuthSandbox, public layoutSandbox: LayoutSandbox) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: [
        '',
        [Validators.required, Validators.pattern(this.emailPattern)]
      ],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });
    this.getCaptcha();
  }


getCaptcha(){
  this._authSerive.getCaptcha().subscribe((response: any) => {
 
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    
    // Optional: set font style
    ctx.font = '30px Arial';
  
    // Set fill color
    ctx.fillStyle = 'blue';
  
    // Draw the z
    
      // (x=50, y=50)
    this.captchaData.code = response.data.code;
    this.captchaData.browserIdentifier = response.data.browserIdentifier;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(this.captchaData.code, 50, 50);
  
  }, (error) => {
    console.log('Error while getting captcha', error);
  })

}

  // validation for forget password
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  /**
   * Handles form 'submit' event. Calls sandbox login function if form is valid.
   *
   * @param event form event
   * @param form entire form value
   */
  onSubmit(form: any) {
    this.ifSubmitted = true;
    const param: any = {};
    param.userName = this.loginForm.value.userName;
    param.password = this.loginForm.value.password;
    const captchaValue = document.getElementById('user-input') as HTMLInputElement;
    param.captcha = captchaValue.value;
    param.browserIdentifier = this.captchaData.browserIdentifier;
    this.authSandbox.authLogin(param);
    this.subscriptions.push(this.authSandbox.loginLoaded$.subscribe(data => {
      if (data === true) {
        const user = JSON.parse(localStorage.getItem('adminUser'));
        this.layoutSandbox.getUserDetail(user);
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
