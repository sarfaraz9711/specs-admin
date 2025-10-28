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
import { Api } from '../../../providers/api/api';

@Injectable()
export class LanguagesService extends Api {
  public languageList: any;
  private params: any = {};
  private url: string = this.getBaseUrl();

  languageGetData() {
    return this.languageList;
  }

  languageSetData(data) {
    this.languageList = data;
  }

  // Languages list

  public Languageslist(params: any): Observable<any> {
    return this.http.get(this.url + '/language/languagelist', {
      params: params
    });
  }

  // update Language
  public UpdateLanguage(param: any, Id: number): Observable<any> {
    return this.http.put(this.url + '/language/update-language/' + Id, param);
  }

  //  # Language ADD
  ADDLanguage(param: any): Observable<any> {
    return this.http.post(this.url + '/language/add-language', param);
  }

  //  # delete
  // delete country
  public DeleteLanguage(param: any, Id: number): Observable<any> {
    return this.http.delete(
      this.url + '/language/delete-language/' + Id,
      param
    );
  }

  // Languages list pagination

  public Languageslistpagination(params: any): Observable<any> {

    return this.http.get(this.url + '/language/languagelist', {
      params: params
    });
  }
}
