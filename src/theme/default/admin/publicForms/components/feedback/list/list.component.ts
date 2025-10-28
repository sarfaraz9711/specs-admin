import { Component, OnInit } from '@angular/core';
import { FeedbackSandbox } from '../../../../../../../core/admin/PublicForms/feedback/feedback.sandbox';
import { Subscription } from 'rxjs';
import { ExcelService } from 'src/core/admin/PublicForms/excelfeedback.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];
  public feedbackListArray: any;
  constructor(
    public feedbackSandbox: FeedbackSandbox,
    public excelService: ExcelService
  ) {

    this.subscribeFeedback();
  }

  ngOnInit(): void {
    this.feedbackList();
  }

  subscribeFeedback() {
    this.subscriptions.push(this.feedbackSandbox.feedbackList$.subscribe(data => {
      this.feedbackListArray = [];
      if(data && data.length > 0){

        var myArray = data;
        myArray.sort(function(a, b) {
          return (a.createdDate > b.createdDate) ? -1 : ((a.createdDate < b.createdDate) ? 1 : 0);
      });


        this.feedbackListArray = myArray
      }
    }))
  }

  feedbackList() {
    this.feedbackSandbox.getFeedbackList(null);
  }

  exportAsXLSX(){
    this.excelService.exportAsExcelFile(this.feedbackListArray, 'sample')
  }

}
