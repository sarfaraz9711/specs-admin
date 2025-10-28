import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigrationFacilityCodeService } from 'src/core/admin/reports/configrationFacilityCode.service';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';

@Component({
  selector: 'app-remark-report',
  templateUrl: './remark-report.component.html',
  styleUrls: ['./remark-report.component.scss']
})
export class RemarkReportComponent implements OnInit {

  public RemarkList: any;
  newList: any;
  constructor(
    private route: Router,
    private _configrationFacilityCodeService: ConfigrationFacilityCodeService,
    private excelService: ExcelService,

  ) { }

  addDiscount() {
    this.route.navigate(['/promotions/discount-Products/add']);
  }

  ngOnInit(): void {
    this.getDiscountProduct();
  }
  getDiscountProduct () {
    this._configrationFacilityCodeService.listAllRemarks().subscribe((res : any)=> {
      this.newList = res.data
      this.RemarkList = res.data.sort((a,b)=>(b.id-a.id));
    })
  }
  searchcancel(val:any, check:number){
    if(check==1){
    this.RemarkList = this.newList.filter((item:any)=>{
      return item.orderPrefixId==val
    })
  }else{
    this.RemarkList=this.newList
  }
  }
  exportAsXLSX(){
    const remarkExportData=this.RemarkList;
    let remarkData:any[]=[]
    remarkExportData.forEach((item:any, i)=>{
      const dateString = item.createdDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
      remarkData.push({
        "S.No":i+1, "Order ID":item.orderPrefixId,"User name":item.userName,"Email":item.email,"Remark":item.remarks,"Date":formattedDate
      })
    })
    this.excelService.exportAsExcelFile(remarkData, 'remark-report')
  
  
  }
}



