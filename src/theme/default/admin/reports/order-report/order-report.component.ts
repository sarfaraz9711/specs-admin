import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { DeliveryTatService } from "src/core/admin/reports/deliveryTat.service";
import { ExcelService } from "src/core/admin/reports/excelfacility.service";



@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html'
})

export class OrderReportComponent implements OnInit{
    orderReportData: any[]=[];
    exportReportForm:FormGroup
    popupMessage= new BehaviorSubject({})
  constructor(
    private excelService: ExcelService,
    private _deliveryTatService: DeliveryTatService,
  ){ }

  
  ngOnInit(){
    this.exportReportForm = new FormGroup({
        fromDate: new FormControl(null, Validators.required),
        toDate: new FormControl(null, Validators.required),
        orderStatus: new FormControl("", Validators.required)
    })
  }


    exportAsXLSX(){
        const payload:any=`fromDate=${this.exportReportForm.value.fromDate}&toDate=${this.exportReportForm.value.toDate}&orderStatusIds=${this.exportReportForm.value.orderStatus}`
this._deliveryTatService.orderReportApi(payload).subscribe((res:any)=>{
    if(res.length>0){
        this.excelService.exportAsExcelFile(res, 'order-report')
    }   else{
        this.popupMessage.next({
            popupShow: true,
            popupHeader:"Message",
            popupMessage:"No Data found for Export",
            popupAction:"Ok",
            popupClass: "alert alert-danger",
            popupRoute: ""
          })
    }
})
    
    }
}

