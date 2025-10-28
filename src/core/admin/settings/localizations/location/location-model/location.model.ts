/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
export class LocationForm {
  public countryId: number;
  public code: string;
  public name: String;
  public status: number;
  public locationId: number;

  constructor(locationForm: any) {
    this.countryId = locationForm.country || 0;
    this.code = locationForm.locationcode || '';
    this.name = locationForm.locationname || '';
    this.status = locationForm.status || 1;
    if (locationForm && locationForm.locationId) {
      this.locationId = locationForm.locationId || '';
    }
  }
}
