/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { ConfigService } from '../../service/config.service';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: false
};

@Injectable()
export class Api {
  constructor(public http: HttpClient, public configService: ConfigService, private _datePipe : DatePipe) {}

  protected getBaseUrl(): string {
    return environment.baseUrl;
  }
  protected tokenAuth = () => {
    let s : any
    let d : any
    s = (btoa("hash2 keyword uses for the encryption as string"));
    s = s.replaceAll("a","aTmopp");
    
    d = this._datePipe.transform(new Date(), "yyyy-MM-dd H:mm:ss") ;
    d = s+"#s-r"+btoa(d)+"?p-r"+btoa('encryption');
    d = btoa(d);

    let authToken : any
    authToken = sessionStorage.getItem("authKey");

    let head:any
    const _hd = new HttpHeaders();
    head = _hd.set('ACCESS-TOKEN',d);

    if(authToken){
      head = head.append('AUTH-TOKEN-GUARD',authToken);
    }

    return head;
  } 

  protected securePost = <T>(url:any,data:any) => {
    return this.http.post<T>(url,data,{ headers: this.tokenAuth() });
  }
  protected secureGet = <T>(url:any,params:any) => {
    return this.http.get<T>(url,{ headers: this.tokenAuth() });
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
