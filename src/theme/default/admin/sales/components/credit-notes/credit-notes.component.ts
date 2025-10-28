import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LayoutService } from 'src/core/admin/sales/layout/layout.service';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';

@Component({
  selector: 'app-credit-notes',
  templateUrl: './credit-notes.component.html',
  styleUrls: ['./credit-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditNotesComponent implements OnInit {
  
  cnListArray: any[]=[];
  showAction: boolean = true;
  cnStatus: any = '';
  orderId:any = '';
  cnCode:any='';
  fromField:any= '';
  toField:any='';
  showUpdatePopup:boolean=false;
  formError:string='';
  cnAmount: any='';
  recordIdForUpdate:any;
  expiryDate: any='';
  createdDate: any='';
  mobile: any='';
  email: any='';
  amount: any='';
  channelName: any='';
  type: any='';
  limit: any=100;
  constructor(private _service: LayoutService,
     private _cd: ChangeDetectorRef,
     private excelService : ExcelService,
     private _route: Router
     ) { }

  ngOnInit() {
    // this.getReturnOrderList()
    sessionStorage.removeItem("creditNoteId")
    this.getCnList()
  }

  getCnList(){
    const params =`?status=${this.cnStatus}&cn_code=${this.cnCode}&cn_source_order_id=${this.orderId}&fromDate=${this.createdDate}&toDate=${this.expiryDate}&channelName=${this.channelName}&amount=${this.amount}&email=${this.email}&mobile=${this.mobile}&type=${this.type}&limit=${this.limit}`;
    this._service.cnList(params).subscribe((res:any)=>{
      this.cnListArray = res.data;
      const currentDate:any=new Date().setHours(23, 59, 0, 0)
      this.cnListArray.map(element => {
        const cnDate:any=new Date(element.expiredDate).setHours(23, 59, 0, 0)
        if(element.createdDate == element.modifiedDate){
          Object.assign(element, {'modifiedStatus':'NA'})
        }else{
          Object.assign(element, {'modifiedStatus':element.modifiedDate})
        }
        if(cnDate<currentDate){
          Object.assign(element, {'statusA':'Expired'})
          element.cnStatus=0
        }else if(element.cnStatus==0 && element.appliedOrderId){
          Object.assign(element, {'statusA':'Redeem'})
        }else if(element.cnStatus==0){
          Object.assign(element, {'statusA':'Inactive'})
        }else{
          Object.assign(element, {'statusA':'Active'})
        }
        
      }); 
      this._cd.detectChanges()
     })
  }

  formOnChange(value:any, formItem:any) {
    if(formItem == 'status'){
      this.cnStatus = value;
    }
    if(formItem == 'orderId'){
      this.orderId = value;
    }
    if(formItem == 'cnCode'){
      this.cnCode = value;
    }
    if(formItem == 'channelName'){
      this.channelName = value;
    }
    if(formItem == 'amount'){
      this.amount = value;
    }
    if(formItem == 'email'){
      this.email = value;
    }
    if(formItem == 'mobile'){
      this.mobile = value;
    }
    if(formItem == 'createdDate'){
      this.createdDate = value;
    }
    if(formItem == 'expiryDate'){
      this.expiryDate = value;
    }
    if(formItem == 'type'){
      this.type = value;
    }
    this._cd.detectChanges()
  }
  searchcancel(flag:any ){
    if(flag == '1'){
    const params =`?status=${this.cnStatus}&cn_code=${this.cnCode}&cn_source_order_id=${this.orderId}&fromDate=${this.createdDate}&toDate=${this.expiryDate}&channelName=${this.channelName}&amount=${this.amount}&email=${this.email}&mobile=${this.mobile}&type=${this.type}`;
    this._service.cnList(params).subscribe((res:any)=>{
      console.log(res.data, "Nerosdfsfs")
      this.cnListArray = res.data;
      const currentDate:any=new Date().setHours(23, 59, 0, 0)
      this.cnListArray.map(element => {
        const cnDate:any=new Date(element.expiredDate).setHours(23, 59, 0, 0)
        if(element.createdDate == element.modifiedDate){
          Object.assign(element, {'modifiedStatus':'NA'})
        }else{
          Object.assign(element, {'modifiedStatus':element.modifiedDate})
        }
        if(cnDate<currentDate){
          Object.assign(element, {'statusA':'Expired'})
          element.cnStatus=0
        }else if(element.cnStatus==0 && element.appliedOrderId){
          Object.assign(element, {'statusA':'Redeem'})
        }else if(element.cnStatus==0){
          Object.assign(element, {'statusA':'Inactive'})
        }else{
          Object.assign(element, {'statusA':'Active'})
        }
        
        
      }); 
      this._cd.detectChanges()
     })
    
    }else{
      this.orderId = "";
      this.cnStatus = "";
      this.cnCode = "";
      this.fromField = "";
      this.toField = "";
      this.createdDate=""
      this.expiryDate=""
      this.channelName=""
      this.amount=""
      this.email=""
      this.mobile=""
      this.type=""
      this.limit=this.limit
      this.getCnList();
      this._cd.detectChanges()
    }
  }

  makeCnActiveInactive = ($event: any, data: any) => {
    const cnStatus = $event.target.checked;
    let params: any = {
      cnId: data.Id,
      status: cnStatus ? 1 : 0
    }
    this._service.UpdateCn(params).subscribe((res: any) => {
      console.log(res)
      this.getCnList();
    
    })
  }

  showUpdateCnModal(action:boolean){
    this.showUpdatePopup =action;
  }
  updateCnUpdate = ($event: any, data: any)=> {
    this.recordIdForUpdate = data.Id;
    sessionStorage.setItem("creditNoteId",data.Id)
    this._route.navigate(["sales/create-credit-notes"])
    // this.cnAmount = data.cnAmount;
    // this.showUpdateCnModal(true);
  }

  upDateformOnChange = (changedValue:any) => {
    this.cnAmount = changedValue;
  }

  updateFormValidate = () => {
    let cnAmount = this.cnAmount;
    if(cnAmount.length > 0){
       cnAmount = cnAmount.trim()
     if(/^[0-9]+$/.test(cnAmount)){
      return true;
     }else{
      return false;
     }
    }else{
     return false;
    }
  }
  upDateCnForm = () => {
    if(this.updateFormValidate()){
    console.log('ssssss', this.cnAmount)
    let params: any = {
      cnId: this.recordIdForUpdate,
      amount: this.cnAmount
    }
    this._service.UpdateCn(params).subscribe((res: any) => {
      console.log(res)
      this.getCnList();
      this.showUpdateCnModal(false);
    })
    }else{
      this.formError = "Please enter valid value";
    }
  }

  exportAsXLSX(){
    const params =`?status=${this.cnStatus}&cn_code=${this.cnCode}&cn_source_order_id=${this.orderId}&fromDate=${this.createdDate}&toDate=${this.expiryDate}&channelName=${this.channelName}&amount=${this.amount}&email=${this.email}&mobile=${this.mobile}&type=${this.type}`;
    this._service.cnList(params).subscribe((res:any)=>{
      if(res.data && res.data.length > 0){
       const excelData = res.data.map(item=>{
          const [yy, mm, dd] = item.cnCreatedDate.split('-');
          const [eyy, emm, edd] = item.expiredDate.split('-');
          if(new Date(item.expiredDate).getTime()<new Date().getTime()){
            Object.assign(item, {'statusA':'Expired'})
          }else if(item.status==0){
            Object.assign(item, {'statusA':'Inactive'})
          }else{
            Object.assign(item, {'statusA':'Active'})
          }
          if(item.createdDate == item.modifiedDate){
            Object.assign(item, {'modifiedStatus':'NA'})
          }else{
            Object.assign(item, {'modifiedStatus':item.modifiedDate})
          }
           return {
            
            Code: item.cnCode,
            Status: item.statusA,
            Amount: item.cnAmount,
            IssueDate: `${dd}-${mm}-${yy}`,
            ExpireDate: `${edd}-${emm}-${eyy}`,
            cnOrderId: item.sourceOrderPrefixId,
            cnAppliredOrderId: item.appliedOrderId,
            'Email Id': item.emailId,
            'Mobile': item.mobile,
            'Channel Name': item.channelName,
            'CN Type':item.channelName=='Admin'?'Order CN':item.channelName=='Service and Repair'?'Service and Repair':'Claim Based CN',
            'Modified Date':item.modifiedStatus
          }
        })
      this.excelService.exportAsExcelFile(excelData, 'credit-notes-report')
      this._cd.detectChanges()
      }
     })
  }
  createCreditNote(){
    this._route.navigate(['sales/create-credit-notes'])
  }  
}
