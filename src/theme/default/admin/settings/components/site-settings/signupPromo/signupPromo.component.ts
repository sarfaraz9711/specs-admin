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
  selector: "app-settings-sitesettings-seo",
  templateUrl: "./signupPromo.component.html",
  styles: [
    `
      .settings-right-wrapper {
        margin-top: 0px !important;
      }
      .validationcolor {
        border-color: red !important;
      }
      .settings-right-wrapper {
        display: block;
        margin-left: 0px !important;
        background: white;
        padding: 15px 30px 100px;
        margin-top: 40px;
      }
      .setting2-inner-header {
        justify-content: space-between;
        margin-bottom: 15px;
        margin-left: 0px !important;
        padding: 8px;
      }
    `,
  ],
})
export class SignUpPromoComponent implements OnInit {
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
    this.minDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
  }

  // initially calls initForm,getseoinfo,subscribe
  ngOnInit() {
    this.initForm();
    this.getSignupPromoSettinginfo();
    //this.subscribe();
  }

  // Subscribe getSeoinfo Bind formcontrol
  // subscribe() {
  //   this.subscriptions.push(this.seoSandbox.newSeo$.subscribe(data => { }));
  //   this.subscriptions.push(
  //     this.seoSandbox.getSeo$.subscribe(data => {
  //       if (data && data[0]) {
  //         this.seoForm.controls['metaTagDescription'].setValue(
  //           data[0].metaTagDescription
  //         );
  //         this.seoForm.controls['metaTagKeyword'].setValue(
  //           data[0].metaTagKeywords
  //         );
  //         this.seoForm.controls['metaTitle'].setValue(data[0].metaTagTitle);
  //       }
  //     })
  //   );
  // }

  /**
   * Handles form 'list' event. Calls sandbox Seo getSeo  function .
   *
   */

  getSignupPromoSettinginfo() {

    this._service.getSignupPromoSetting().subscribe((res: any) => {
      console.log(res, "neeraj sfsfsf");
      if (res.status == 1) {
        const initStartDate = this.datePipe.transform(res.data.startDate, 'dd-MM-yyyy').split('-');
        res.data.startDate = `${initStartDate[2]}-${initStartDate[1]}-${initStartDate[0]}`

        const initEndDate = this.datePipe.transform(res.data.endDate, 'dd-MM-yyyy').split('-');
        res.data.endDate = `${initEndDate[2]}-${initEndDate[1]}-${initEndDate[0]}`
        res.data.signUpPopUp = atob(res.data.signUpPopUp);
        this.bannerFileName = res.data.bannerImage;
        this.signUpPopUpName=res.data.signupPopupImage;
        this.settingData = res.data;
      }
      this._cd.detectChanges();
    });
  }

  // Init Form Group
  initForm() {
    this.recordId = new FormControl();
    this.couponAmount = new FormControl("", Validators.required);
    this.couponCode = new FormControl("");
    this.bannerImage = new FormControl("");
    this.signupPopupImage = new FormControl("");
    this.signUpPopUp = new FormControl("");
    this.minCartValue = new FormControl("", Validators.required);
    this.maxCartValue = new FormControl("", Validators.required);
    this.startDate = new FormControl("", Validators.required);
    this.endDate = new FormControl("", Validators.required);
    this.discountAmountType = new FormControl("", Validators.required);
    this.settingActiveField = new FormControl();
    this.maxCouponUse = new FormControl("", Validators.required);
    this.noOfMaxCouponUsePerUser = new FormControl("", Validators.required);
    this.seoForm = this.fb.group({
      recordId: this.recordId,
      settingActiveField: this.settingActiveField,
      couponAmount: this.couponAmount,
      couponCode: this.couponCode,
      bannerImage: this.bannerImage,
      signupPopupImage: this.signupPopupImage,
      signUpPopUp: this.signUpPopUp,
      minCartValue: this.minCartValue,
      maxCartValue: this.maxCartValue,
      startDate: this.startDate,
      endDate: this.endDate,
      discountAmountType: this.discountAmountType,
      maxCouponUse: this.maxCouponUse,
      noOfMaxCouponUsePerUser: this.noOfMaxCouponUsePerUser,
    });
  }

  uploadFile(event: any, type: string) {
    const fileData = event.target.files[0];
    console.log(event.target.files[0]);
    const uploadFileType = event.target.files[0].type;

    let setFileType = "";
    if (
      uploadFileType == "image/png" ||
      uploadFileType == "image/jpg" ||
      uploadFileType == "image/jpeg"
    ) {
      setFileType = "image";
    } else {
      setFileType = "Format Not valid";
      event.target.value = "";
    }

    let fd = {};
    let reader = new FileReader();
    let fileBase64: any;

    reader.onloadend = function () {
      fileBase64 = reader.result;
    };
    reader.readAsDataURL(fileData);
    setTimeout(async () => {
      fd = {
        fileName: event.target.files[0].name,
        path: "",
        image: fileBase64,
      };
      this.bannerService.fileUpload(fd).subscribe((res: any) => {
        if (type === "bannerImage") {
         // this.settingData = res.data;
          this.bannerFileName = res.data.image;
        }else if(type === "signupPopupImage"){
         // this.settingData = res.data;
          this.signUpPopUpName = res.data.image;

        }
        this._cd.detectChanges();
      });
    }, 100);
  }

  /**
   * Handles form 'submit' event. Calls sandbox Seo createSeo function if form is valid.
   *
   * @param seoForm entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.seoForm.invalid) {
      return;
    }

    if (
      this.seoForm.value.discountAmountType == "percent" &&
      Number(this.seoForm.value.couponAmount) > 100
    ) {
      this.errorMessage = "Coupon percent can not greator than 100%";
      this.errorSet = "1";

      return;
    }

    const params: any = {};
    params.isSettingActive = this.seoForm.value.settingActiveField;
    params.couponValue = this.seoForm.value.couponAmount;
    params.couponCode = this.seoForm.value.couponCode;
    params.bannerImage = this.bannerFileName;
    params.signupPopupImage = this.signUpPopUpName;
    params.signUpPopUp = btoa(this.seoForm.value.signUpPopUp);
    params.Id = this.seoForm.value.recordId;
    let startDateWithTime = new Date(this.seoForm.value.startDate)
    let endDateWithTime = new Date(this.seoForm.value.endDate)
    // startDateWithTime.setHours(startGetHoursMin[0])
    // startDateWithTime.setMinutes(startGetHoursMin[1])  
    params.startDate = startDateWithTime.toString();
    params.endDate = endDateWithTime.toString();

    params.minimumPurchaseAmount = this.seoForm.value.minCartValue;
    params.maximumPurchaseAmount = this.seoForm.value.maxCartValue;
    params.discountTypeAmountIn = this.seoForm.value.discountAmountType;
    params.maxCouponUse = this.seoForm.value.maxCouponUse;
    params.noOfMaxCouponUsePerUser = this.seoForm.value.noOfMaxCouponUsePerUser;
    this._service.updateSignupPromoSetting(params).subscribe((res) => {
      this.errorMessage = "";
      this.errorSet = "0";
      this._cd.detectChanges();
    });
  }

  seoCancel() {
    this.router.navigate(["/settings"]);
  }
}
