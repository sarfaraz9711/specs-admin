import { Injectable } from '@angular/core';
import  {Api } from '../../../core/admin/providers/api/api'

@Injectable({
  providedIn: 'root'
})
export class PageServiceService extends Api {

  params: any = {};
  private URL = this.getBaseUrl();

  uploadFile(payload: any) {
    return this.http.post(this.URL + '/page/annual-report-file-upload', payload);
  }
}
