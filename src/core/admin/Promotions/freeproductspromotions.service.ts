
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Api } from '../providers/api/api'
@Injectable()
export class FreeProductPromtionService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();

  addFreeProductPromotion(payload: any) {
    
    return this.http.post(this.URL + '/promotions/add-free-product', payload);
  }

  listFreeProductPromotions () {
    return this.http.get(this.URL + '/promotions/get-active-free-product-promo-list');
  }

  listCartValuePromotions () {
    return this.http.get(this.URL + '/promotions/cart-value-based/list');
  }


  getFreePromotionDetails (id: number) {
    return this.http.get(this.URL + '/promotions/get-promotion-by-id?id='+id);
  }

  updateFreeProductPromotion(payload: any) {
    
    return this.http.post(this.URL + '/promotions/update-free-product', payload);
  }

  
}
