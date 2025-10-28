import { Injectable } from "@angular/core";
import  {Api } from '../../../core/admin/providers/api/api'

@Injectable({
  providedIn: 'root'
})
export class AddFacilitySkuMappingService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();

  // constructor() { }
  addFacilitySku(payload: any) {
    return this.http.post(this.URL + '/master/secure/add-facility-code', payload);
  }

  listFacilitySku () {
    return this.http.get(this.URL + '/master/secure/all-facility-code-data');
  }

  deleteFacilitySku(json:any){
    console.log(json, "cbhsbc")
    return this.http.post(this.URL+'/master/secure/update-facility-code-status',json)
  }

  filterFacilitySku(json: any){
    return this.http.post(this.URL+'/master/secure/facility-code-based-sku-list',json)
  }
  
}