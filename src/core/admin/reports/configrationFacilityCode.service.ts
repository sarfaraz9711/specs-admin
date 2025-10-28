
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Api } from '../providers/api/api'
@Injectable()
export class ConfigrationFacilityCodeService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();

  addFacilityCode(payload: any) {
    
    return this.http.post(this.URL + '/scheduler/secure/tm-facility-inventory-sync', payload);
  }

  listFacilityCode () {
    return this.http.get(this.URL + '/scheduler/secure/tm-facility-inventory-list');
  }
  listAllRemarks () {
    return this.http.get(this.URL + '/remarks/get-all-remarks');
  }
  
}
