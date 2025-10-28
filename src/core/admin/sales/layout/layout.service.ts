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
import { ConfigService } from '../../service/config.service';
import { Api } from '../../providers/api/api';

@Injectable()
export class LayoutService extends Api {
  params: any = {};
  // private URL = this.configService.get('api').baseUrl;
  private URL = this.getBaseUrl();

  /* get product list count api*/
  public getOrderListCount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = {
      count: 'true',
      customerName: '',
      dateAdded: '',
      keyword: '',
      limit: '',
      offset: '',
      orderId: '',
      totalAmount: '',
      orderStatusId: ''
    };
    return this.http.get(this.URL + '/order/orderlist', reqOpts);
  }

  /* get product list count api*/
  public getTodayOrderListCount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/today-order-count', reqOpts);
  }

  /* get product list count api*/
  public getTotalOrderAmount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/total-order-amount', reqOpts);
  }

  /* get product list count api*/
  public getTodayOrderAmount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.URL + '/order/today-order-amount', reqOpts);
  }
    /* change payment api*/
    public changePayment(filterParam: any): Observable<any> {
      return this.http.post(this.URL + '/order/update-payment-status', filterParam);
    }

     /* get Sales count api*/

  public getSalesCount(): Observable<any> {
    return this.http.get(this.URL + '/order/order-count');
  }
  returnOrderList(params: any): Observable<any> {
    return this.http.get(this.URL + '/orders/order-return-list',{params: params });
  }
  getVarientDetails(productId:any) {
    return this.http.get(this.URL + '/product-store/productdetailById?productId='+productId);
  }
  createOrder(orderData:any){
    return this.http.post(this.URL + '/orders/create-order-by-admin',orderData);
  }
  cancelOrder(cancelOrderData:any){
    return this.http.post(this.URL + '/unicommerce/order-product-reverse-pickup',cancelOrderData);
  }
  addCouponBasedPromotion(payload: any) {
    return this.http.post(this.URL + '/promotions/coupon-based/add', payload);
  }
refundSubmit(payload:any){
  return this.http.post(this.URL+'/order/initiate-refund',payload)
}
updateOrderProductReturn(query:any){
  return this.http.get(this.URL+`/orders/order-return-update?orderProductPrefixId=${query}`)
}

createCreditNote(payload: any){
  return this.http.post(this.URL+'/credit-note/create',payload)
}

getRefundInfo(payload: any){
  return this.http.post(this.URL+'/order/get-refund-info',payload)
}

rejectReturnRequest(payload: any){
  return this.http.post(this.URL+'/order/reject-return-request',payload)
}

closeReturnRequest(payload: any){
  return this.http.post(this.URL+'/order/close-return-request',payload)
}

getRefundInfoOfOrderReturn(payload: any){
  return this.http.post(this.URL+'/order/get-refund-info-for-afterdelivery',payload)
}

refundSubmitForReturnItem(payload:any){
  return this.http.post(this.URL+'/order/initiate-refund-of-return-item',payload)
}

getCnInfoOfOrderReturn(payload: any){
  return this.http.post(this.URL+'/order/get-cn-info-for-afterdelivery',payload)
}

getProductDetailBySku(skuName:any){
  return this.http.get(this.URL+`/product/get-product-by-sku/${skuName}`)  
}
cancelOrderByAdmin(payload: any){
  return this.http.post(this.URL+'/unicommerce/partial-cancel-sale-order',payload)
}

getRemarks(orderId:any){
  return this.http.get(this.URL+`/remarks/get-remarks?orderId=${orderId}`)  
}

addRemarks(json:any){
  return this.http.post(this.URL+`/remarks/save-remarks`,json)  
}

UpdateReturnStatus(payload: any){
  return this.http.post(this.URL+'/orders/update-return-status',payload)
}

customerDetail(Id: any): Observable<any> {
  return this.http.get(this.URL+'/customer/customer-details/' + Id);
}
cnList(params:any): Observable<any> {
  return this.http.get(this.URL+'/credit-note/admin/cnlist'+params);
}

UpdateOrderStatus(payload: any){
  return this.http.post(this.URL+'/order/update-order-delivery-status',payload)
}
UpdateCn(payload: any){
  return this.http.post(this.URL+'/credit-note/admin/cnUpdate',payload)
}


partiaOrderCancelItem(payload: any){
  return this.http.post(this.URL+'/unicommerce/partial-order-cancel-item',payload)
}
createCn(data:any, action:any){
  if(action){
    return this.http.post(this.URL+'/credit-note/update-claim-credit-note',data)
  }else{
    return this.http.post(this.URL+'/credit-note/create-claim-credit-note',data)
  }
}

getCnDetailsById(cnId:any){
  return this.http.get(this.URL+'/credit-note/cn-details-by-id/'+cnId);  
}

getOrderPrefixId(orderId:any){
  return this.http.get(this.URL+'/credit-note/get-order-prefix-id/'+orderId);  
}

getCnSourceOd(orderId:any){
  return this.http.get(this.URL+'/order/get-source-order/'+orderId);  
}
getFacilityData(){
  return this.http.get(this.URL+'/facility/list');  
}
updateFacility(data){
  return this.http.post(this.URL+'/facility/update-order-facility',data);  
}

orderHistoryViewList(orderProductId){
  return this.http.get(`${this.URL}/order-status-history/get-data-by-order-product-id/${orderProductId}`);  
}

cancelledReversePickup(payload:any){
  return this.http.post(this.URL+'/unicommerce/cancel-reverse-pickup',payload)
}
}
