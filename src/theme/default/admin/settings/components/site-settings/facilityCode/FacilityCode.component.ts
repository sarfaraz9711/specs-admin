/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs/index";
import { SeoSandbox } from "../../../../../../../core/admin/settings/siteSettings/seo/seo-sandbox";
import { Router } from "@angular/router";
import { LayoutService } from "src/core/admin/catalog/layout/layout.service";
import { BannerService } from "src/core/admin/cms/banners/banner.service";
import { DatePipe } from '@angular/common';
@Component({
  selector: "facilityCode",
  templateUrl: "./FacilityCode.component.html"
})
export class FacilityCodeComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];
  public seoForm: FormGroup;
  public submitted = false;
  public recordId: FormControl;
  public settingActiveField: FormControl;
  public couponAmount: FormControl;
  public couponCode: FormControl;
  public bannerImage: FormControl;
  public signupPopupImage: FormControl;
  public signUpPopUp: FormControl;
  public minCartValue: FormControl;
  public maxCartValue: FormControl;
  public startDate: FormControl;
  public endDate: FormControl;
  discountAmountType: FormControl;
  maxCouponUse: FormControl;
  noOfMaxCouponUsePerUser: FormControl;
  errorSet = "0";
  errorMessage = "";
  settingData: any = {};
  
  
  imageUploadData: any = {};
  imageUploadBannerData: any = {};
  bannerFileName: any = "";
  signUpPopUpName: any = "";
  minDate: string;
  facilityDataList: any[]=[];

  constructor(
    public fb: FormBuilder,
    public seoSandbox: SeoSandbox,
    private router: Router,
    public _service: LayoutService,
    private _cd: ChangeDetectorRef,
    public datePipe: DatePipe,

    public bannerService: BannerService
  ) {
    const today = new Date();
  }
  facilityForm: FormGroup
  facilityData:any={}
  // initially calls initForm,getseoinfo,subscribe
  ngOnInit() {
    this.facilityFormList()
    this.getData()
  }


facilityFormList(){
  this.facilityForm = this.fb.group({
    facilityName: new FormControl(null, Validators.required),
    facilityCode: new FormControl(null, Validators.required),
    pincode: new FormControl(null, Validators.required),
    id: new FormControl(null),
    status: new FormControl("",Validators.required),
  })
}
onSubmit(){
  console.log("this.facilityForm",this.facilityForm.value)
  this._service.postDataFacility(this.facilityForm.value).subscribe((res:any)=>{
    if(res.status==200){
  this.facilityForm.reset()
  this.getData()    
    }
  this._cd.detectChanges();
  })
}

getData(){
  this._service.getDataFacility().subscribe((res:any)=>{
    this.facilityDataList = res.data
    this._cd.detectChanges();
  })
}
updateData(data:any){
  this.facilityData=data
  this._cd.detectChanges();
}
}
