import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import  {Api } from '../../../core/admin/providers/api/api'


@Injectable()

export class ContactUsService extends Api {
    params: any = {};
    private URL = this.getBaseUrl();
  
    listContactUs () {
      return this.http.get(this.URL + '/contact-us/contactus-list');
    }

    

 
}