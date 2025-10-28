import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CouponBasedPromotionService } from '../../../../../../../core/admin/Promotions/couponBased.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public formData: FormGroup;employeePromotionType: any;
;
  public minDate: any;
  public minTime: any;
  public minAmount: any;
  public couponList: any;


  public isEdit: boolean = false;
  editId: number;
  public promoDetails: any = {};

  public minEndDate: any;
  public minEndTime: any;
  public maxStartDate: any;
  public maxStartTime: any;
  public maxVal: number;
  popupMessage = new BehaviorSubject({});
  public minPurchaseAmount: number;
  public maxPurchaseAmount: number;
  formInvalid: boolean;
  popupErrorMsg: any;
  datePipeString: string;
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private toastr: ToastrManager,
    private datePipe: DatePipe,
    private _couponBasedPromotionService: CouponBasedPromotionService,
    private _activatedRouter: ActivatedRoute,
   
  ) { 

  }

  // initForm(){
  //   const couponNameValidation = '[0-9A-Z \'-,;.]*';
  // }
  orderCoupanData:boolean=false
  ngOnInit() {
    // this.initForm();
    this.getCouponlist();
    if(sessionStorage.getItem("creditNoteData")!=null){
      const coupanData =JSON.parse(sessionStorage.getItem("creditNoteData"))
      this.promoDetails.emailRestrictions = coupanData.email
      this.promoDetails.orderId = coupanData.cancelItemPrefixId?coupanData.cancelItemPrefixId:coupanData.orderId
      this.promoDetails.orderProductPrefixId = coupanData.cancelItemPrefixId?coupanData.cancelItemPrefixId:null
      this.orderCoupanData=true
      sessionStorage.removeItem("creditNoteData")
    }

    
    this.minDate = this.datePipeString = this.datePipe.transform(new Date(), "yyyy-MM-dd")
    // let currentDateObj = new Date();
    // let months = (currentDateObj.getMonth()).toString().length==1?("0"+(currentDateObj.getMonth()+1)):(currentDateObj.getMonth()+1)
    // this.minDate = currentDateObj.getFullYear() + "-" + (months) + "-" + currentDateObj.getDate();
    

    this.formData = this.fb.group({
      couponPromotionType: new FormControl(null, [Validators.required]),
      couponCode: new FormControl( null, [Validators.required]),
      couponName: new FormControl( null, [Validators.required]),
      couponType: new FormControl( null, [Validators.required]),
      couponValue: new FormControl( null, [Validators.required]),
      startDate: new FormControl( null, [Validators.required]) ,
      startTime: new FormControl(null, [Validators.required]),
      endDate: new FormControl( null, [Validators.required]),
      endTime: new FormControl(null, [Validators.required]),
      minimumPurchaseAmount: new FormControl( null, [Validators.required]),
      maximumPurchaseAmount: new FormControl( null, [Validators.required]),
      emailRestrictions: new FormControl(null),
      noOfMaxCouponUsePerUser: new FormControl( null, [Validators.required]),
      maxCouponUse: new FormControl( null, [Validators.required]),
      status: new FormControl( null, [Validators.required]),
      orderId: new FormControl(null),
      noOfCoupon: new FormControl(null, Validators.required)
    })

    this._activatedRouter.params.subscribe(res => {
      if (res && res.id) {
        this.isEdit = true;
        this.editId = res.id;
        this.setFormData(res);
        this.formData.controls.noOfCoupon.setValidators(Validators.nullValidator)
        this.formData.controls.noOfCoupon.updateValueAndValidity()
      }else{
        this.generateCoupanCode()
      }
    })
  }

  setFormData(res) {
    this._couponBasedPromotionService.getFreePromotionDetails(res.id).subscribe((res: any) => {
      this.promoDetails = res && res.data[0];
      this.promoDetails.startTime = new Date(this.promoDetails.startDate).getHours()+":"+new Date(this.promoDetails.startDate).getMinutes()
      this.promoDetails.endTime = new Date(this.promoDetails.endDate).getHours()+":"+new Date(this.promoDetails.endDate).getMinutes() 
      this.promoDetails.startDate = this.datePipe.transform(this.promoDetails.startDate, "yyyy-MM-dd")
      this.promoDetails.endDate = this.datePipe.transform(this.promoDetails.endDate, "yyyy-MM-dd")
      if(this.promoDetails.orderId){
        this.orderCoupanData=true
      }
      this.employeeCoupen(this.promoDetails.couponPromotionType)
    })
  }

  

  onSubmits(formData) {
    if(this.employeePromotionType == "employeesOnly"){
      this.formData.value.noOfCoupon= 1
    }
    console.log(formData, "Nero form Data")
    let startDateWithTime = new Date(formData.startDate)
    let startGetHoursMin = formData.startTime.split(":")
    startDateWithTime.setHours(startGetHoursMin[0])
    startDateWithTime.setMinutes(startGetHoursMin[1])    
    let endDateWithTime = new Date(formData.endDate)
    let endGetHoursMin = formData.endTime.split(":")
    endDateWithTime.setHours(endGetHoursMin[0])
    endDateWithTime.setMinutes(endGetHoursMin[1])
    formData.startDate = startDateWithTime.toString()
    formData.endDate = endDateWithTime.toString()
    console.log("this.promoDetails.orderId",this.formData.value.orderId)
    if (startDateWithTime.getTime() > endDateWithTime.getTime()) {
      this.formInvalid=true
      this.popupErrorMsg="The start date and time is not greater than the end date and time"
    }else if(this.formData.value.couponValue>100 && this.formData.value.couponType==1){
      this.formInvalid=true
      this.popupErrorMsg="Percentage value should be between 1 to 100"
    }else if((Number(this.formData.value.minimumPurchaseAmount)<this.formData.value.couponValue)){
      this.formInvalid=true
      this.popupErrorMsg="Coupon discount value should be less than minimum purchase amount"
    }else{
      this.formInvalid=false
    }

    if(this.formInvalid){
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: this.popupErrorMsg,
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return false
    } if( Number(this.minPurchaseAmount) > Number(this.maxPurchaseAmount)){
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "The minimum value not greater then to maximum value",
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return false
    }
    let coupon: any
    if(this.couponList.length>0){
    coupon = this.couponList.some(item => {
      return this.formData.value.couponCode == item.couponCode 
    })
  }
    console.log(coupon, "xvcxvc");
    if( coupon > 0  && !this.isEdit){
      this.showNotificationError('already exits');
    }
   
    else {
      if (this.isEdit) {
        this.updateFormData(formData);
      }else{
        console.log(formData, "formdataformdata")
      this.saveFormData(formData)
      }
    }
   
  }

  setDiscountValue(val: number){
    if(val > 100 ){
      this.maxVal = 100
    }else if( val < 0 ){
      this.maxVal = 0
    }else {
      this.maxVal = val;
    }
  }

  setStartMinDate(val: any){
    this.minEndDate = val;
  }

  setStartMinTime(val: any){
    this.minEndTime = val;
  }

  setEndMinDate(val: any){
    this.maxStartDate = val;
  }

  setEndMinTime(val: any){
    this.maxStartTime = val;
  }

  setMinAmount(val: any){
    this.minPurchaseAmount = val;
  }

  setMaxAmount(val: any){
    this.maxPurchaseAmount = val;
    const maximumPurchaseAmount = this.formData.get("maximumPurchaseAmount")
    if(this.minPurchaseAmount<val){
      console.log(1)
      maximumPurchaseAmount.setErrors({'server-error':'error'})
    }else{
      console.log(2)
      maximumPurchaseAmount.setValidators(Validators.required)
    }
    maximumPurchaseAmount.updateValueAndValidity()
  }

  

  onCancel() {
    this._router.navigate(['/promotions/coupon-based/list'])
  }

  getCouponlist(){
    this._couponBasedPromotionService.listFreeProductPromotions().subscribe((res: any) => {
      this.couponList = res.data;
    }, (err) => {
    })
  }

  saveFormData(formData) {
    console.log("formDataformData",formData)
    this._couponBasedPromotionService.addCouponBasedPromotion(formData).subscribe((res) => {
      // if(formData.orderId){
      //   if(this.promoDetails.orderProductPrefixId){
      //     this._couponBasedPromotionService.updateOrderProductReturn(this.promoDetails.orderProductPrefixId).subscribe((res:any)=>{

      //     })
      //   }else{

      //   }
      // }
      this._router.navigate(['/promotions/coupon-based/list'])
    });
  }

  updateFormData(formData) {
    let payload = { "coupon_id": this.editId, ...formData };
    console.log(payload, "Nero hello")
    this._couponBasedPromotionService.updatePromotion(payload).subscribe((res) => {
      this._router.navigate(['/promotions/coupon-based/list'])
      });
  }

generateCoupanCode(){
  this.promoDetails.couponCode = ("RC"+(Math.random() + 1).toString(36).substring(7)).toUpperCase();
}
ngDoCheck(){
  // const invalid = [];
  // const controls = this.formData.controls;
  // for (const name in controls) {
  //     if (controls[name].invalid) {
  //         invalid.push(name);
  //     }
  // }
  // console.log(invalid)
}
employeeCoupen(event){
  console.log("heeloo", event)
  this.employeePromotionType = event

  const couponType = this.formData.get("couponType")
  const couponValue = this.formData.get("couponValue")
  const minimumPurchaseAmount = this.formData.get("minimumPurchaseAmount")
  const maximumPurchaseAmount = this.formData.get("maximumPurchaseAmount")
  const emailRestrictions = this.formData.get("emailRestrictions")
  const noOfCoupon = this.formData.get("noOfCoupon")
  const maxCouponUse = this.formData.get("maxCouponUse")
  const noOfMaxCouponUsePerUser = this.formData.get("noOfMaxCouponUsePerUser")

  
    if(this.employeePromotionType == "employeesOnly"){
      if(!this.isEdit){
      this.promoDetails.couponCode=""
      }
      console.log(1)
      couponType.setValidators(Validators.nullValidator)
      couponValue.setValidators(Validators.nullValidator)
      minimumPurchaseAmount.setValidators(Validators.nullValidator)
      maximumPurchaseAmount.setValidators(Validators.nullValidator)
      emailRestrictions.setValidators(Validators.nullValidator)
      noOfCoupon.setValidators(Validators.nullValidator)
      maxCouponUse.setValidators(Validators.nullValidator)
      noOfMaxCouponUsePerUser.setValidators(Validators.nullValidator)
    }else{
      if(!this.isEdit){
        this.generateCoupanCode()
        }
      console.log(2)
      couponType.setValidators(Validators.required)
      couponValue.setValidators(Validators.required)
      minimumPurchaseAmount.setValidators(Validators.required)
      maximumPurchaseAmount.setValidators(Validators.required)
      emailRestrictions.setValidators(Validators.required)
      maxCouponUse.setValidators(Validators.required)
      noOfMaxCouponUsePerUser.setValidators(Validators.required)

    }
    couponType.updateValueAndValidity()
    couponValue.updateValueAndValidity()
    minimumPurchaseAmount.updateValueAndValidity()
    maximumPurchaseAmount.updateValueAndValidity()
    emailRestrictions.updateValueAndValidity()
    noOfCoupon.updateValueAndValidity()
    maxCouponUse.updateValueAndValidity()
    noOfMaxCouponUsePerUser.updateValueAndValidity()

  }


}
