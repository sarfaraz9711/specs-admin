import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryService } from 'src/core/admin/PublicForms/enquiry.service';
import { ExcelServiceEnquiry } from 'src/core/admin/PublicForms/excelenquiry.service';


@Component({
  selector: 'app-enquiry',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class EnquiryList implements OnInit {
public enquiryList: any;
  constructor(
    private route: Router,
    private _enquiryService: EnquiryService,
    private excelService: ExcelServiceEnquiry
  ) { }

  ngOnInit(): void {
    this.getEnquiryList();
  }

  getEnquiryList() {
    this._enquiryService.listEnquiryData().subscribe((res: any) => {
      console.log(res, "ghghjhj")
      if(res && res.status == 200){
        
        this.enquiryList = res.data;
      }
    }, (err) => {

    });
  }

  exportAsXLSX(){
    this.excelService.exportAsExcelFile(this.enquiryList, 'sample')
  }

}
