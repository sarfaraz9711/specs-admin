import { Injectable } from "@angular/core";
import  {Api } from '../../../core/admin/providers/api/api'

@Injectable({
  providedIn: 'root'
})
export class FacilitySkuMappingService extends Api {
  params: any = {};
  private URL = this.getBaseUrl();

  // constructor() { }
  importFileSystem(payload: any) {
    return this.http.post(this.URL + '/master/secure/inventory-mapping/import-inventory', payload);
  }
}
