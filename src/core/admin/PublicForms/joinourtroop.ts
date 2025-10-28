import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import  {Api } from '../../../core/admin/providers/api/api'


@Injectable()

export class JoinOurTroopService extends Api {
    params: any = {};
    private URL = this.getBaseUrl();
  
    listTroopData() {
      return this.http.get(this.URL + '/career/careerlist');
    }

    

 
}