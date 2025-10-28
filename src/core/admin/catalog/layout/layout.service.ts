/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class LayoutService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();


   /* get order list count api*/

   public getCatalogCount(): Observable<any> {
    return this.http.get(this.URL + '/product/product-count');
  }
  getSignupPromoSetting(): Observable<any> {
    return this.http.get(this.URL+'/promotions/get_signup_promotion_setting');
  }
  updateSignupPromoSetting(param: any): Observable<any> {
    return this.http.post(this.URL + '/promotions/signup_promotion_setting_update', param);
  }

getDataFacility(){
  return this.http.get(this.URL+"/facility/list")
}

postDataFacility(data:any){
  return this.http.post(this.URL+"/facility/add",data)
}

}
