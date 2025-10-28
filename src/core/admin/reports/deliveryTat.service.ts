import { Injectable } from '@angular/core';
import { Api } from '../providers/api/api';

@Injectable()
export class DeliveryTatService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();

  addTat(payload: any) {
    
    return this.http.post(this.URL + '/order-tracking/secure/tat-matrix-upload', payload);
  }
  
orderReportApi(query:any){
  return this.http.get(this.URL + `/order/order-report?${query}`);
}

  
paymentReportApi(query:any){
  return this.http.get(this.URL + `/order/payment-report?${query}`);
}


}