import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import  {Api } from '../../../core/admin/providers/api/api'


@Injectable()

export class EnquiryService extends Api {
    params: any = {};
    private URL = this.getBaseUrl();
  
    listEnquiryData() {
      return this.http.get(this.URL + '/enquiry/enquirylist');
    }

    

 
}