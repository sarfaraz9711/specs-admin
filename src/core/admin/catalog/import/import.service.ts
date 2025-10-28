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
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable()
export class ImportService extends Api {

  // address url
  private url: string = this.getBaseUrl();



  downloadFile(params): Observable<any> {
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

    return this.http.get( this.url + '/product/download-product-sample', reqOpts);
  }

  uploadFile(params): Observable<any> {
    const formData = new FormData();
    formData.append('file', params.file, params.file.name);
    console.log(params.file, params.file.name, "filedatrta")
    return this.http.post( this.url + '/product/import-product-data', formData);
  }

  updateProduct(payload:any, flag:any): Observable<any> {
    // return this.http.post( this.url + '/product/update-price-and-discount', payload);
    if(flag==1){
    return this.http.post( this.url + '/product/import-product-update', payload);
    }else{
      return this.http.post( this.url + '/data-migration/users/secure/mapImagesToProduct', payload);
    }
  }

  downloadCorrectionFile(filepath:any): Observable<any> {
    console.log("data PayLOAD>>>>>>>>>>",filepath);
     return this.http.get( this.url + '/product/download-custom-file?filename='+filepath);
   }

   addEmployee(params): Observable<any> {

    return this.http.post( this.url + '/employee/add-employee', params);
  }

  updateEmployee(params): Observable<any> {

    return this.http.post( this.url + '/employee/update-employee', params);
  }

  getemployeeReport(query:any){
    return this.http.get(this.url + `/employee/download-employee?${query}`);
  }

  getallEmployeedata(){
    return this.http.get(this.url + `/employee/order-by-employee`);
  }

}
