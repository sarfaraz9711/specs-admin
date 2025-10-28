
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Api } from '../providers/api/api'
@Injectable()
export class CouponBasedPromotionService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();

  addCouponBasedPromotion(payload: any) {
    
    return this.http.post(this.URL + '/promotions/coupon-based/add', payload);
  }

  listFreeProductPromotions () {
    return this.http.get(this.URL + '/promotions/coupon-based/list');
  }
  listFreeProductPromotionsAll (params:any) {
    return this.http.get(this.URL + '/promotions/coupon-based/list'+params);
  }

  couponBasedDetail (couponCode:any) {
    return this.http.get(this.URL + '/promotions/coupon-based/detail?couponCode='+couponCode);
  }

  getFreePromotionDetails (id: number) {
    return this.http.get(this.URL + '/promotions/coupon-based/get-promotion-by-id?id='+id);
  }

  updatePromotion(payload: any) {
    
    return this.http.post(this.URL + '/promotions/coupon-based/update', payload);
  }

  updateOrderProductReturn(query:any){
    return this.http.get(this.URL+`/orders/order-return-update?orderProductPrefixId=${query}`)
  }

  listSignupCouponsList (params:any) {
    return this.http.get(this.URL + '/promotions/get_signup_promotion_list'+params);
  }
  
}
