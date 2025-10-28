
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Api } from '../providers/api/api'
@Injectable()
export class DiscountProductPromtionService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();


  listDiscountProducts (minValue:any, maxValue:any) {
    return this.http.get(this.URL + `/discount/all-discount-products?min=${minValue}&max=${maxValue}`);
  }

  listAllDiscountProducts () {
    return this.http.get(this.URL + '/discount/get-all-offer');
  }

  generateUrlById(payload: any) {
    
    return this.http.post(this.URL + '/discount/generate-url', payload);
  }

  updateproductById(id){
    return this.http.get(this.URL + `/discount/update-status/${id}`)
  }

  
}
