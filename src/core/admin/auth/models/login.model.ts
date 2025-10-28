/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class LoginForm {
  // Declare Default Params

  public username: String;
  public password: String;
  public captcha: String;
  public browserIdentifier: String;
  constructor(loginForm: any) {
    this.username = loginForm.userName || '';
    this.password = loginForm.password || '';
    this.captcha = loginForm.captcha || '';
    this.browserIdentifier = loginForm.browserIdentifier || '';

  }
}
