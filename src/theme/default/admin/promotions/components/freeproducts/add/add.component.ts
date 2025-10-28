/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
// Store
import { CouponSandbox } from '../../../../../../../core/admin/catalog/coupon/coupon.sandbox';
import { CouponService } from '../../../../../../../core/admin/catalog/coupon/coupon.service';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { min, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
//import { ProductListModel } from './product-model/Product-list.model';
import { ProductService } from '../../../../../../../core/admin/catalog/product/product.service';
import { FreeProductPromtionService } from '../../../../../../../core/admin/Promotions/freeproductspromotions.service';
import { group } from 'console';
import {BehaviorSubject} from "rxjs"
@Component({
  selector: 'app-free-product-promo-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class FreeProductPromoAddComponent {
  public user: FormGroup;
  public form: FormGroup;
  public promoName: FormControl;
  public submittedValues = false;
  public minDate: any;
  public minTime : any;
  public startDate: any;
  public endDate: any;
  public status: any;
  public productList: any;
  public selectedBuyProducts: any;
  public selectedOfferProducts: any;
  public promotionsList: any;
  public promoDetails: any = {};


  public isEdit: boolean = false;
  editId: number;
  childTableId: number;
  minEndDate: any;
  maxStartDate: any;
  minEndTime: any;
  maxStartTime: any
  maxVal: number;
  isDisabled: boolean;
  disable = true;
  isPercentage: boolean;
  isAmountDiscount: boolean;
  maxSelectedItems: number=1;
  freeProductPromosList: any[]=[];
  isNotOffer: boolean;
  percentProductListPrice: any=[];
  popupMessage=new BehaviorSubject({})
  promotionListOfX: string[];
  getProductPromosList: any=[];
  datePipeString: string;
  productXprice: any;
  productYprice: any;

  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    public datePipe: DatePipe,
    public productService: ProductService,
    public _FreeProductPromtionService: FreeProductPromtionService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,


  ) {
  }
  onSubmits() {
    let formJson = this.user.value
    let percentOffer = ["buy_x_and_get_x_percent", "buy_x_and_get_y_percent", "buy_2x_and_get_x_percent", "buy_2x_and_get_y_percent", "buy_4x_and_get_x_percent", "buy_4_any_and_get_x_percent"]
    if(this.isNotOffer|| percentOffer.includes(formJson.promoName)){
    formJson.selectedOfferProducts = formJson.selectedBuyProducts
    }
    let startDateWithTime = new Date(formJson.startDate)
    let startGetHoursMin = formJson.startTime.split(":")
    startDateWithTime.setHours(startGetHoursMin[0])
    startDateWithTime.setMinutes(startGetHoursMin[1])    
    let endDateWithTime = new Date(formJson.endDate)
    let endGetHoursMin = formJson.endTime.split(":")
    endDateWithTime.setHours(endGetHoursMin[0])
    endDateWithTime.setMinutes(endGetHoursMin[1])
    formJson.startDate = startDateWithTime.toString()
    formJson.endDate = endDateWithTime.toString()
    if(startDateWithTime.getTime()>endDateWithTime.getTime()){
      this.popupMessage.next({  
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"The start date and time is not greater than the end date and time",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return false
    }
    const promoYList:any[] = ["buy_x_and_get_y_free","buy_2x_and_get_y_free", "buy_2x_and_get_2y_free"]
    if(promoYList.includes(this.user.value.promoName) && this.productXprice<=this.productYprice){
      this.popupMessage.next({  
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Buy product price should be greater than offer product price",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      return false
    }
    let priceSum:any
    console.log(this.percentProductListPrice)
    if(percentOffer.includes(formJson.promoName)){
       priceSum = this.percentProductListPrice.reduce(function (a, b) {
        return a + Number(b.productSellingPrice);
    }, 0);
    }
    console.log(formJson, priceSum)
    if(formJson.percentageDiscount!=null){
      formJson.discouctAmount=priceSum*formJson.percentageDiscount/100
    }
    console.log(formJson)
    if (this.isEdit) {
      this.updateFormData(formJson)
    } else {
      this.saveFormData(formJson)

    }
  }

  changeFromDate(event) { 
    this.minDate = event.value;
  }

  ngOnInit() {
    this.getProductList();
    this.getPromotionsTypeList();
    this.getFreeProductPromoList()
    this.getCartValuePromotion()
    // let currentDateObj = new Date();
    // let months = (currentDateObj.getMonth()).toString().length==1?("0"+(currentDateObj.getMonth()+1)):(currentDateObj.getMonth()+1)
   
    
    this.minDate = this.datePipeString = this.datePipe.transform(new Date(), "yyyy-MM-dd")

    this.user = this.fb.group({
        promoName: new FormControl(this.promoName, [Validators.required]),
        startDate: new FormControl(this.startDate, [Validators.required]),
        startTime: new FormControl(null, [Validators.required]),
        endDate: new FormControl(this.endDate, [Validators.required]),
        endTime: new FormControl(null, [Validators.required]),
        status: new FormControl(this.status, [Validators.required]),
        selectedBuyProducts: new FormControl(null, [Validators.required]),
        selectedOfferProducts: new FormControl(null, [Validators.required]),
        percentageDiscount: new FormControl(null),
        discouctAmount: new FormControl(null),
    })
    this._activatedRouter.params.subscribe(res => {
      if (res && res.id) {
        this.isEdit = true;
        this.editId = res.id;
        this.setFormData(res)
      }
    })
  }

  setStartMinDate(val: any) {
    this.minEndDate = val
  }

  setEndMinDate(val: any) {
    this.maxStartDate = val
  }

  setStartMinTime(val: any){
    this.minEndTime = val;
  }

  setEndMinTime(val: any){
    this.maxStartTime = val
  }

  setPercentageValue(val: number){
    if(val > 100 ){
      this.maxVal = 100
    }else if( val < 0 ){
      this.maxVal = 0
    }else {
      this.maxVal = val;
    }
  }



  getProductList() {
    let param = {
      "offset": 0,
      "limit": 0,
      "keyword": "",
      "sku": "",
      "status": '1',
      "price": 0,
      "count": false,
      "upc":""
    }
    this.productService.productList(param).subscribe((res: any) => {
      if (res.status == 1) {
        this.productList = res.data;
        this.productList = this.productList.map((item:any)=>{
          return Object.assign(item, {productNameUpc: `${item.name} - (UPC: ${item.upc})`})
        })
      }
    }, (err) => {

    });

  }

  getPromotionsTypeList() {
    this.promotionsList = [
      { id: "buy_x_and_get_x_free", name: 'Buy x and get x free' },
      { id: "buy_x_and_get_y_free", name: 'Buy x and get y free' },
      { id: "buy_2x_and_get_x_free", name: 'Buy 2x and get x free' },
      { id: "buy_2x_and_get_y_free", name: 'Buy 2x and get y free' },
      { id: "buy_2x_and_get_2x_free", name: 'Buy 2x and get 2x free' },
      { id: "buy_2x_and_get_2y_free", name: 'Buy 2x and get 2y free' },
      { id: "buy_x_and_get_x_percent", name: 'Buy x and get x in percent'},
      { id: "buy_x_and_get_y_percent", name: 'Buy x and get y in percent'},
      { id: "buy_2x_and_get_x_percent", name: 'Buy 2x and get x in percent'},
      { id: "buy_2x_and_get_y_percent", name: 'Buy 2x and get y in percent'},
      { id: "buy_4x_and_get_x_percent", name: 'Buy 4x and get x in percent'},
      { id: "buy_4x_and_get_x_amount", name: 'Buy 4x and get x amount discount'},
      { id: "buy_4_any_and_get_x_percent", name: 'Buy 4 selected product and get x in percent'},
      { id: "buy_4_any_and_get_x_amount", name: 'Buy 4 selected product and get x amount discount'}
    ];
    this.promotionListOfX = ["buy_x_and_get_x_free", "buy_2x_and_get_x_free", "buy_2x_and_get_2x_free", "buy_x_and_get_x_percent", "buy_2x_and_get_x_percent", "buy_4x_and_get_x_percent", "buy_4x_and_get_x_amount"]
  }

  onCancel() {
    this._router.navigate(['/promotions/freeproducts/list'])
  }

  setFormData(res) {
    this._FreeProductPromtionService.getFreePromotionDetails(res.id).subscribe((res: any) => {
      this.promoDetails = res && res.data[0];
      this.promoDetails.startTime = ((new Date(this.promoDetails.start_date).getHours()).toString().length==1?"0"+new Date(this.promoDetails.start_date).getHours():new Date(this.promoDetails.start_date).getHours())+":"+((new Date(this.promoDetails.start_date).getMinutes()).toString().length==1?"0"+new Date(this.promoDetails.start_date).getMinutes():new Date(this.promoDetails.start_date).getMinutes())
      this.promoDetails.endTime = ((new Date(this.promoDetails.end_date).getHours()).toString().length==1?"0"+new Date(this.promoDetails.end_date).getHours():new Date(this.promoDetails.end_date).getHours())+":"+((new Date(this.promoDetails.end_date).getMinutes()).toString().length==1?"0"+new Date(this.promoDetails.end_date).getMinutes():new Date(this.promoDetails.end_date).getMinutes())
      this.promoDetails.startTime = this.promoDetails.startTime.length==1?"0"+this.promoDetails.startTime:this.promoDetails.startTime
      this.promoDetails.start_date = this.datePipe.transform(this.promoDetails.start_date, "yyyy-MM-dd")
      this.promoDetails.end_date = this.datePipe.transform(this.promoDetails.end_date, "yyyy-MM-dd")
      this.promoDetails.buy_product_id = [parseInt(this.promoDetails.buy_product_id)] 
      this.promoDetails.get_product_id = [parseInt(this.promoDetails.get_product_id)]
      this.childTableId = this.promoDetails.id;
      if(this.promotionListOfX.includes(this.promoDetails.free_promotion_type)) {
        this.isNotOffer=true
        this.user.get("selectedOfferProducts").disable()
      }
      if (this.promoDetails.free_promotion_type == "buy_x_and_get_x_free" || this.promoDetails.free_promotion_type == "buy_2x_and_get_x_free" || this.promoDetails.free_promotion_type == "buy_2x_and_get_2x_free") {
        this.isNotOffer=true
      } else if(this.promoDetails.free_promotion_type == "buy_x_and_get_x_percent" || this.promoDetails.free_promotion_type == "buy_2x_and_get_x_percent" || this.promoDetails.free_promotion_type == "buy_4x_and_get_x_percent" || this.promoDetails.free_promotion_type == "buy_4_any_and_get_x_percent"){
        this.isPercentage=true
        this.isNotOffer=true
      }  else if(this.promoDetails.free_promotion_type == "buy_x_and_get_y_percent" || this.promoDetails.free_promotion_type == "buy_2x_and_get_y_percent"){
        this.isPercentage=true
      } else if(this.promoDetails.free_promotion_type == "buy_4x_and_get_x_amount" || this.promoDetails.free_promotion_type == "buy_4_any_and_get_x_amount"){
        this.isAmountDiscount=true
        this.isNotOffer=true
      }else {
        this.isNotOffer=false
      }
      if(this.promoDetails.free_promotion_type == "buy_4_any_and_get_x_amount" || this.promoDetails.free_promotion_type == "buy_4_any_and_get_x_percent"){
        this.maxSelectedItems=4
      }
    })
  }

  saveFormData(user) {
    this._FreeProductPromtionService.addFreeProductPromotion(user).subscribe((res) => {
      this._router.navigate(['/promotions/freeproducts/list'])
    });
  }

  updateFormData(user) {
    let payload = { "id": this.editId, ...user, "childTablePKId": this.childTableId };
    this._FreeProductPromtionService.updateFreeProductPromotion(payload).subscribe((res) => {
      this._router.navigate(['/promotions/freeproducts/list'])
    });
  }

  setXProduct(val:any, event:any) {
    this.percentProductListPrice = event
    if(this.percentProductListPrice && this.percentProductListPrice.length>0){
    if(val==2){
      this.productXprice = Number(this.percentProductListPrice[0].productSellingPrice)
    }else{
      this.productYprice = Number(this.percentProductListPrice[0].productSellingPrice)
    }
  }
  console.log(val, event)
    const buyProduct = this.user.value.selectedBuyProducts!=undefined?this.user.value.selectedBuyProducts[0]:null
    const offerProduct =this.user.value.selectedOfferProducts!=undefined?this.user.value.selectedOfferProducts[0]:null 
    if((this.user.value.selectedBuyProducts!=undefined || this.user.value.selectedOfferProducts!=undefined) && this.user.value.selectedBuyProducts!="" && (this.freeProductPromosList.includes(buyProduct) || this.freeProductPromosList.includes(offerProduct))){
      this.promoDetails.get_product_id = null
      this.promoDetails.buy_product_id = null
      if(val==2){
        this.user.get("selectedBuyProducts").reset()
      }else{
        this.user.get("selectedOfferProducts").reset()
      }
this.popupMessage.next({
  popupShow: true,
  popupHeader:"Message",
  popupMessage:"This product already in offer. Please disable this product in offer list",
  popupAction:"Ok",
  popupClass: "alert alert-danger",
  popupRoute: ""
})
    }else{
      if(val!=1 && this.user.value.selectedBuyProducts!=undefined && this.user.value.selectedOfferProducts!=undefined && !this.promotionListOfX.includes(this.user.value.promoName) 
        && (this.user.value.selectedBuyProducts[0].toString()==this.user.value.selectedOfferProducts[0].toString() || this.freeProductPromosList.includes(this.user.value.selectedOfferProducts[0].toString()))){
          this.promoDetails.get_product_id = null
          this.promoDetails.buy_product_id = null
          if(val==2){
            this.user.get("selectedBuyProducts").reset()
          }else{
            this.user.get("selectedOfferProducts").reset()
          }
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"This product already in offer. Please disable this product in offer list",
      popupAction:"Ok",
      popupClass: "alert alert-danger",
      popupRoute: ""
    })
      }else{
    this.isPercentage=false
    this.isAmountDiscount=false
    this.maxSelectedItems=1
    const percentageDiscount = this.user.get("percentageDiscount")
    const discouctAmount = this.user.get("discouctAmount")
    const selectedOfferProducts = this.user.get("selectedOfferProducts")
    selectedOfferProducts.setValidators([Validators.nullValidator])
    percentageDiscount.setValidators([Validators.nullValidator])
    discouctAmount.setValidators([Validators.nullValidator])
    this.isNotOffer=false
    this.isPercentage=false
    if (this.user.value.promoName == "buy_x_and_get_x_free" || this.user.value.promoName == "buy_2x_and_get_x_free" || this.user.value.promoName == "buy_2x_and_get_2x_free") {
      this.isNotOffer=true
      selectedOfferProducts.disable()
    } else if(this.user.value.promoName == "buy_x_and_get_x_percent" || this.user.value.promoName == "buy_2x_and_get_x_percent" || this.user.value.promoName == "buy_4x_and_get_x_percent" || this.user.value.promoName == "buy_4_any_and_get_x_percent"){
      percentageDiscount.setValidators([Validators.required])
      this.isPercentage=true
      this.isNotOffer=true
      selectedOfferProducts.disable()
    }  else if(this.user.value.promoName == "buy_x_and_get_y_percent" || this.user.value.promoName == "buy_2x_and_get_y_percent"){
      percentageDiscount.setValidators([Validators.required])
      this.isPercentage=true
    } else if(this.user.value.promoName == "buy_4x_and_get_x_amount" || this.user.value.promoName == "buy_4_any_and_get_x_amount"){
      discouctAmount.setValidators([Validators.required])
      this.isAmountDiscount=true
      this.isNotOffer=true
      selectedOfferProducts.disable()
    }else {
      selectedOfferProducts.setValidators([Validators.required])
      this.user.get("selectedOfferProducts").enable()
      this.isNotOffer=false
    }
    if(this.user.value.promoName == "buy_4_any_and_get_x_amount" || this.user.value.promoName == "buy_4_any_and_get_x_percent"){
      this.maxSelectedItems=4
    }
    selectedOfferProducts.updateValueAndValidity()
    percentageDiscount.updateValueAndValidity()
    discouctAmount.updateValueAndValidity()
  }
}
  }

  getFreeProductPromoList () {
    this._FreeProductPromtionService.listFreeProductPromotions().subscribe((res : any)=> {
      if(res && res.status == 200){
        let allData:any=res.data
        allData.forEach(element => {  
          if(element.is_active==1){
          this.freeProductPromosList.push(Number(element.buy_product_id), Number(element.get_product_id))
          }
        });
        
      }
    }, (err) => {
    })
  }
  setYProduct(){
    if(this.user.value.selectedBuyProducts.includes(this.user.value.selectedOfferProducts[0])){
      this.user.get("selectedOfferProducts").reset()
      this.promoDetails.get_product_id = null
      this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"This product already in offer.",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
    }
  }

  getCartValuePromotion(){
    this._FreeProductPromtionService.listCartValuePromotions().subscribe((res:any)=>{
      const data:any = res.data
      data.forEach((element:any) => {
        if(element.productId && element.isActive==1){
        this.freeProductPromosList.push(element.productId)
        }
      });
    })
  }
}







