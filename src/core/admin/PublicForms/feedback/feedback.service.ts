import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';

@Injectable()
export class FeedbackService extends Api {
  public feedbackData: any;

  url = this.getBaseUrl();
  getFeedbackList(params: any): Observable<any> {

    return this.http.get(this.url + '/feedback/feedbacklistdata');
  }
}
