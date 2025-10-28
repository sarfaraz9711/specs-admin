import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LayoutService } from 'src/core/admin/sales/layout/layout.service';
@Component({
  selector: 'app-create-credit-notes',
  templateUrl: './create-credit-notes.component.html',
  styleUrls: ['./create-credit-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCreditNotesComponent implements OnInit {
  edit: boolean=false;
  cnStatus: boolean;
  expiredCn: boolean;
  constructor(private _service: LayoutService, private _cd : ChangeDetectorRef, private _datePipe:DatePipe) { }
  popupMessage= new BehaviorSubject({})
  selectedChannel: any="";
  channelType:any='hidden'
  creditNoteForm:FormGroup
  creditNoteData:any={status:""}
  ngOnInit() {
    
   this.creditNoteFormList() 
   if(sessionStorage.getItem("creditNoteId")){
      this.getCreditNote(sessionStorage.getItem("creditNoteId"))
   }else{
    this.creditNoteData.cn_code = ("CBCN"+(Math.random() + 1).toString(36).substring(7)).toUpperCase();
   }
  }

creditNoteFormList(){
  this.creditNoteForm = new FormGroup({
    id: new FormControl(null),
    cn_code: new FormControl(null, Validators.required),
    cn_amount: new FormControl(null, Validators.required),
    cn_created_date: new FormControl(null, Validators.required),
    cn_expiry_date: new FormControl(null, Validators.required),
    cn_source_order_id: new FormControl(null, Validators.required),
    status: new FormControl("", Validators.required),
    emailId: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{1,4}$")]),
    mobile: new FormControl(null, [Validators.required, Validators.pattern("^[6,7,8,9]{1}[0-9]{9}$")]),
    channelName: new FormControl("", Validators.required),
  })
}

addChannel(val:any){
  console.log(val)
  this.selectedChannel=val
  if(val=='Other'){
    this.channelType='text'
    this.creditNoteData.channelName=null
  }else{
    this.channelType='hidden'
    this.creditNoteData.channelName=val
  }
}
formSubmit(){
  if(new Date(this.creditNoteForm.value.cn_created_date).getTime()>new Date(this.creditNoteForm.value.cn_expiry_date).getTime()){
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"CN Created Date can't be less than CN Expiration Date",
      popupAction:"Ok",
      popupClass: "alert alert-danger",
      popupRoute: ""
    })
  }else{
    if(this.edit){
    this.creditNoteForm.value.status=this.cnStatus
    }
  this._service.createCn(this.creditNoteForm.value, this.edit).subscribe((res:any)=>{
    if(res.status==1){
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:res.message,
      popupAction:"Ok",
      popupClass: "alert alert-success",
      popupRoute: "sales/credit-notes"
    })
  }else{
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"Something went wrong",
      popupAction:"Ok",
      popupClass: "alert alert-danger",
      popupRoute: ""
    })    
  }
  this._cd.detectChanges()
  },(err:any)=>{
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"Something went wrong, Getting server side error",
      popupAction:"Ok",
      popupClass: "alert alert-danger",
      popupRoute: ""
    })
  })
  }
}
getCreditNote(id:any){
  this._service.getCnDetailsById(id).subscribe((res:any)=>{
    if(res.status==200){
      this.edit=true
      this.creditNoteData=res.data
      this.selectedChannel=this.creditNoteData.channelName
      this.cnStatus=this.creditNoteData.status
      this.creditNoteForm.get('status').disable();
      this.creditNoteForm.get('cn_code').disable();
      this.creditNoteForm.get('cn_source_order_id').disable();
      this.getOrderPrefixId(this.creditNoteData.cn_source_order_id)
      if(new Date().getTime()>new Date(this.creditNoteData.cn_expiry_date).getTime()){
        this.expiredCn=true
      }
      this.creditNoteData.cn_expiry_date = this._datePipe.transform(this.creditNoteData.cn_expiry_date, "yyyy-MM-dd");
    }else{
      this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"No data found",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: "sales/credit-notes"
      })
    }
    this._cd.detectChanges()
  })
}

getOrderPrefixId(orderId:any){
this._service.getOrderPrefixId(orderId).subscribe((res:any)=>{
  if(res.status==200){
    this.creditNoteForm.get('cn_source_order_id').setValue(res.data.orderPrefixId)
  }
})
}

}
