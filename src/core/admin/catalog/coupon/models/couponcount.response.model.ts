/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

export class CouponcountResponseModel {
  public user: any = {};

  constructor(couponcountResponse: any) {
    this.user = couponcountResponse || '';
  }
}
