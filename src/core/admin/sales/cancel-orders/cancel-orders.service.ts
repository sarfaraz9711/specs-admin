/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CancelOrderService extends Api {

  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();


  // get cancel order list

  public cancelOrderList(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-cancel-request-list', { params: params });
  }

  // get cancel order list count

  public cancelOrderListCount(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-cancel-request-list', { params: params });
  }

  // change cancel order status

  public changeCancelOrderStatus(params: any): Observable<any> {
    return this.http.put(this.url + '/order/update-order-cancel-request/' + params.orderProductId, params);
  }

  // export cancel order

  public exportCancelOrder(params: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.url + '/order/order-cancel-excel-list',  reqOpts);
  }

  // export bulk cancel order

  public exportBulkCancelOrder(params: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.url + '/order/bulk-order-cancel-excel-list',  reqOpts);
  }


  // bulk status change

  public bulkStatusChange(params: any): Observable<any> {
    return this.http.get(this.url + '/order/update-bulk-order-cancel-request', {params: params});
  }

   // get cancel order accepted

   public getAcceptedCount(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-cancel-request-list', { params: params });
  }

   // get cancel order rejected

   public getRejectedCount(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-cancel-request-list', { params: params });
  }

  getOrderList(params:any){
    return this.http.get(this.url + '/order/orderlist'+params);
  }

cancelOrderRequest(data:any){
  return this.http.post(this.url+'/unicommerce/partial-cancel-sale-order',data)
}
public getSaleOrder(params: any): Observable<any> {
  return this.http.get(this.url + '/unicommerce/get-sale-order?saleOrderId='+params);
  
}

public getSaleOrderForReturn(params: any){
  return this.http.get(this.url + '/unicommerce/get-sale-order?saleOrderId='+params);
  
}

public sendEmailForRefund(params: any){
  return this.http.post(this.url + '/order/send-email-for-cod-refund',params);
  
}

public checkEmailSend(params: any){
  return this.http.post(this.url + '/order/check-email-send-by-orderId',params);
  
}

public markAsRefunded(params: any){
  return this.http.post(this.url + '/order/mark-as-refunded',params);
  
}

public getOrderCancelRequests(params: any): Observable<any> {
  return this.http.get(this.url + '/order/order-cancel-requests?', {params: params });
  
}

public getOrderCancelRequestsByOrderId(orderId: any): Observable<any> {
  return this.http.get(this.url + '/order-status-history/get-cancel-request-by-order-id/'+orderId);
  }
  public getAllBankTransaction(orderId: any): Observable<any> {
    return this.http.get(this.url + '/order/get-all-bank-transaction-by-order-id/'+orderId);
    }
public createCreditNote(request: any): Observable<any> {
  return this.http.post(this.url + '/credit-note/create/',request);
  
}
public getOrderReturnRequestsByOrderId(orderId: any): Observable<any> {
  return this.http.get(this.url + '/orders/order-return-by-order-id/'+orderId);
  }
  public updateReturnItemList(returnList: any): Observable<any> {
    return this.http.post(this.url + '/orders/update-return-request',returnList);
    }
  


}
