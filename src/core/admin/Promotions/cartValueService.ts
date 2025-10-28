import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import  {Api } from '../../../core/admin/providers/api/api'


@Injectable()

export class CartValueService extends Api {
    params: any = {};
    private URL = this.getBaseUrl();
  
    addCartValuePromotion(payload: any) {
      
      return this.http.post(this.URL + '/promotions/cart-value-based-promotion/add', payload);
    }

    listCartValuePromotions () {
      return this.http.get(this.URL + '/promotions/cart-value-based/list');
    }

    getCartValueDetails (id: number) {
      return this.http.get(this.URL + '/promotions/cart-value-based/get-promotion-by-id?id='+id);
    }

    updateCartValuePromotion(payload: any) {
    
      return this.http.post(this.URL + '/promotions/cart-value-based-promotion/update', payload);
    }

    listFreeProductPromotions () {
      return this.http.get(this.URL + '/promotions/get-active-free-product-promo-list');
    }

    listFreeProductPromotionsRemove (payload:any) {
      console.log("api id<<<<<<<",payload);
      return this.http.post(this.URL + '/promotions/cart-value-based/remove',payload);
      //return this.http.post(this.URL + '/promotions/cart-value-based/remove?id='+id);


    }

 
}