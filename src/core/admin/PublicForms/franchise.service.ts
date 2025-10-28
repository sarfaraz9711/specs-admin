import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import  {Api } from '../../../core/admin/providers/api/api'


@Injectable()

export class FranchiseService extends Api {
    params: any = {};
    private URL = this.getBaseUrl();
  
    listFranchise() {
      return this.http.get(this.URL + '/franchisee/franchiseelist');
    }

    

 
}