/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersSandbox } from '../../../../../../../core/admin/sales/orders/orders-sandbox';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { CurrencySymbolPipe } from '../../../../shared/components/pipes/currency-symbol.pipe';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { LayoutService } from 'src/core/admin/sales/layout/layout.service';
import { viewOrderDetails } from 'src/core/admin/sales/failed-order/failed-order-reducer/failed-order.selector';
import { CancelOrderService } from 'src/core/admin/sales/cancel-orders/cancel-orders.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { resolve } from 'path';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';
import { element } from 'protractor';

@Component({
  selector: 'app-sales-order-vieworders',
  templateUrl: 'vieworders.component.html',
  styleUrls: ['./vieworders.component.scss'],
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ],
  providers: [DatePipe, CurrencySymbolPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewOrdersComponent implements OnInit, OnDestroy {
  @ViewChild('req') req: ElementRef;


  public orderId: any;
  private closeResult: string;
  private invoiceDetail: any;
  private dynamicBody: any = {};
  private docDefinition: any = {};
  private pdf: any;
  private invoice: any;
  private imageUrl: string;
  public orderStatus: any;
  public orderDetails: any = [];
  public orderStatusId: number;
  public isDisabled: boolean;
  public symbolSettings: any;
  private captureDataUrl: any;
  private postImage: any;
  public orderDetail: any;
  public productDetail: any;
  public shippingForm: FormGroup;
  public getDetailLoading = false;
  public selectedPaidValue=false;
  private subscriptions: Array<Subscription> = [];
  public queryData: any = {};
  orderstatusmodel: any= 0;
  shippingmodel: any = 0;
  ordershistory: any=0;
  isReplaceOrder: boolean=false;
  varientJson: {}[];
  productVarient: any=[];
  allProductList: any;
  productVarientList: any;
  setVarientOption: any=[];
  varientType: any=[];
  selectVarient: any=[];
  selectVarientId: any=[];
  selectedProductSKU: any;
  oldProductSkuName: any;
  popupMessage= new BehaviorSubject({})
  isCancelled:boolean=false
  visibleCancelOrderSection:boolean = true;
  visibleReturnOrderSection:boolean = true;
  visibleFullOrderReturnSection: boolean = false;
  visibleAppliedCancelledOrder: boolean = false;
  visibleGivenCNInfoSection: boolean = false;
  visibleGivenBankRefundInfoSection: boolean = false;
  visibleProductReplaceInfoSection: boolean = false;
  isSkuSelected: boolean=true;
  oldProductDetails: any;
  createOrderJson:any= {};
  refundActive:boolean=false;
  performAction: any = "";
  visibleSuccessMessage: boolean = false;
  showRefundInfoPopup: boolean = false;
  showRejectRequestPopup: boolean = false;
  showCancelOrderRequestPopup: boolean = false;
  showCreditNotePopup: boolean = false;
  showReturnRejectRequestPopup: boolean = false;
  showCancelItemFromOldOrderPopup: boolean = false;
  showCnPopForReturnItem: boolean = false;
  returnOrderItemPrice = 0;
  showLoader:boolean = false;
  showReturnRefundItemInfoPopup:boolean = false;
  refundInfoRecords: any=[];
  cnAmountToCreate: 0;
  
  paymentMethod:any;
  newProductSku: any;
  showRefundRequestPopup: boolean;
  newProductDetails: any;
  sendEmailPopUp: any;
  markAsRefundBtn: boolean;
  adminCancelOrderPopup:boolean=false;
  userJson: any;
  orderDetailsView: any={};
  remarkData: any[]=[];
  statusid: any;
  customerDetail: any={};
  sellingPrice: number;
  orderStatusIdValue: number;
  public orderIdvalue: any;
  public orderProductIdValue: any;
  public orderStatusDelivery=false;
  orderStatusHistoryPopup:boolean = false
  orderProductIds: any[]=[];
  rejectItemsList: any[]=[];
  allCancelRequest: any;
  allPendingCancelRequest: any[]=[];
  allBankTransaction: any;
  orderReturnPopup: boolean;
  allPendingReturnRequest: any[]=[];
  allReturnRequest: any;
  allReturnOrderPending: any;
  isRvpGenerated: boolean=false;
  reverseReturnPopup: boolean;
  oldOrderIdCn: boolean=false;
  orderOrderCnId: any[]=[];
  facilityDataList: any;
  selectedFacility: any;
  viewOrderHistoryPopup: boolean;
  orderHistoryList: any[]=[];
  cancelList: any[]=[];
  creditNoteBtnDisabled: boolean=false;
  paymentRemark: any=false;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private route: ActivatedRoute,
    public orderSandbox: OrdersSandbox,
    public layoutSandbox: LayoutSandbox,
    public orderStatusSandbox: OrderstatusSandbox,
    public datePipe: DatePipe,
    private _layoutService: LayoutService,
    private configService: ConfigService, public formbuilder: FormBuilder,
    private cd : ChangeDetectorRef,
    private _service: CancelOrderService,
    private toastr: ToastrManager,
    private _router: Router,
    private excelService: ExcelService,

  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const index = this.route.snapshot.queryParamMap.get('index');
    const offset = this.route.snapshot.queryParamMap.get('offset');

    this.queryData.offset = offset || 0;
    this.queryData.index = index || 0;
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnInit() {
    if(sessionStorage.getItem("isReplaceOrder")=="YES"){
      this.isReplaceOrder=true
      this.getProductVarient(sessionStorage.getItem("json"))
    }

    if(sessionStorage.getItem("json")){
      this.getProductVarient(sessionStorage.getItem("json"))
    }

    if(localStorage.getItem("adminUser")){
      this.userJson = JSON.parse(localStorage.getItem("adminUser")).usergroup.groupId
    }

    this.initShippingForm();
    this.imageUrl = this.configService.getImageUrl();
    this.isDisabled = false;
    this.getOrderStatusList();
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.subscribe();
    this.orderSandbox.getSettings();
    this.captureDataUrl = 'assets/img/storelogo.png';
    this.convertBase64(this.captureDataUrl).subscribe(base64data => {
      this.postImage = 'data:image/jpg;base64,' + base64data;
    });

    this.performAction = sessionStorage.getItem("ACTION");
    if(sessionStorage.getItem("returnRequestData")){
    this.checkEmailSendForCodOrder()
    }
    this.cd.detectChanges();
    console.log("performAction", this.performAction)
    // this.checkRequest(1);
    this.facilityData()
  }

  convertBase64(inputValue: any) {
    return Observable.create((observer: Observer<string>) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = inputValue;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  getBase64Image(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  getOrderStatusList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.status = 1;
    this.orderStatusSandbox.orderStatusList(params);
    // this.cd.detectChanges();
    
  }
  
  open2(content) {
    this.modalService
      .open(content, { windowClass: 'image-manager' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  open(content) {
    this.modalService2.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }
  
  getCustomerDetail(c_id:any){
    this._layoutService.customerDetail(c_id).subscribe((res:any)=>{
      if(res.status==1){
        this.customerDetail=res.data;
      }
      this.cd.detectChanges()
    })
  }
  subscribe() {
    this.route.params.subscribe(data => {
      if (data) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderDetails(param);
        const returnType = sessionStorage.getItem("ACTION");
        let returnRequestData = JSON.parse(sessionStorage.getItem("returnRequestData"));
        if(returnRequestData){
        this.newProductSku = returnRequestData.skuName
        }
        //visibleFullOrderReturnSection
        this.subscriptions.push(this.orderSandbox.viewOrderDetails$.subscribe((value:any) => {
          if(value && value.customerId){
            this.getCustomerDetail(value.customerId)
          }
          const hasUndefined = returnRequestData && returnRequestData.skuRvp.includes('RVP: undefined');
          this.isCancelled = returnRequestData && (returnRequestData.rpCode && !hasUndefined)?true:false
          if (value && value.orderStatusId) {
            this.selectedPaidValue = value.paymentStatus === 1 ? true : false;
            this.paymentMethod = value.paymentMethod;
            this.orderDetail = value;
            if(this.orderDetail.orderStatusId==11){
            this.paymentRemark = this.orderDetail.paymentRemark
            }else{
              this.paymentRemark=false
            }
            this.getRemarks()
            if(sessionStorage.getItem("returnRequestData")){
              this.returnItems()
              }
            this.orderDetailsView.itemsBasePriceTotal=0
            this.orderDetailsView.itemsTotalTax=0
            this.orderDetailsView.productTotalDiscount=0
            this.orderDetailsView.productPromotionDiscountTotal=0
            this.orderDetailsView.cartValueBasedPromoDiscountTotal=0
            this.orderDetailsView.CouponBasedPromoDiscountTotal=0
            this.orderDetailsView.loyaltyPointPromoDiscount=0
            this.orderDetailsView.prepaidOrderDiscount=0
            this.orderDetailsView.creditNoteDiscount=0
            this.orderDetailsView.totalDiscount=0
            this.orderDetailsView.creditNoteCode=''
            this.orderDetailsView.couponCode=''
            this.orderProductIds=[]
            this.orderDetail.productList.forEach((element:any) => {
              this.orderProductIds.push(element.orderProductId)
              this.orderDetailsView.itemsBasePriceTotal+= Math.round(element.basePrice*element.quantity)
              this.orderDetailsView.itemsTotalTax += Math.round(element.taxValueInAmount*element.quantity)
              this.orderDetailsView.productTotalDiscount += Math.round((+element.discountAmount+((element.discountAmount*element.taxValue)/100))*element.quantity)
              this.orderDetailsView.totalDiscount += Math.round((+element.discountAmount+((element.discountAmount*element.taxValue)/100))*element.quantity)
            });
            this.orderDetail.appliedDiscounts.length > 0 && this.orderDetail.appliedDiscounts.forEach(item => {
              if (item.promotionType === "ProductBased") {
                this.orderDetailsView.productPromotionDiscountTotal += parseInt(item.discountedAmount);
              }
              if (item.promotionType === "CartValueBased") {
                this.orderDetailsView.cartValueBasedPromoDiscountTotal += parseInt(item.discountedAmount);
              }
              if (item.promotionType === "CouponBased" || item.promotionType === "employeeCoupon") {
                this.orderDetailsView.CouponBasedPromoDiscountTotal += parseInt(item.discountedAmount);
                this.orderDetailsView.couponCode = item.couponCode;
              }
              if (item.promotionType === "loyaltyPoint") {
                this.orderDetailsView.loyaltyPointPromoDiscount += parseInt(item.discountedAmount);
              }
              if (item.promotionType === "100OffOnPrepaidOrder") {
                this.orderDetailsView.prepaidOrderDiscount += parseInt(item.discountedAmount);
              }
              if (item.promotionType === "CreditNote") {
                console.log("credit note code>>",item.couponCode);
                this.orderDetailsView.creditNoteDiscount += parseInt(item.discountedAmount);
                this.orderDetailsView.creditNoteCode=item.couponCode;
                this.orderDetailsView.cnName = item.couponCode.substring(0,2)

              }
              this.orderDetailsView.totalDiscount += parseInt(item.discountedAmount);
          });
            
            if (returnType == "FULL_ORDER_RETURN" && returnRequestData && returnRequestData.returnStatus == 1) {
              this.visibleFullOrderReturnSection = true;
              this.orderDetail.productList.forEach(element => {
                  this.createOrderJson = {
                    "price": element.productPrice,
                    "basePrice": element.basePrice,
                    "orderId": this.orderDetail.orderId,
                    "orderProductPreFixId": element.orderProductId,
                    "cancelItemPrefixId": element.orderProductPrefixId,
                    "email": this.orderDetail.email,
                    "newSkuName": this.selectedProductSKU,
                    "oldSkuName": element.skuName,
                    "productSellingPrice": element.productSellingPrice
                  }
              });
              this.orderDetail.productList = this.orderDetail.productList.map((item: any) => {
                return Object.assign(item, { "replacementProduct": true })
              })
            } else if(false && (returnType == "REPLACE_PRODUCT" || returnType == "RETURN_ORDER") && returnRequestData && returnRequestData.returnStatus == 1){
              this.orderDetail.productList = this.orderDetail.productList.map((item: any) => {
                return Object.assign(item, { "replacementProduct": sessionStorage.getItem("replaceOrderPreId") == item.orderProductPrefixId ? true : false })
              })
              if (returnType == "REPLACE_PRODUCT" && returnRequestData.returnStatus == 1) {
                this.visibleFullOrderReturnSection = true;
              }
              this.orderDetail.productList.forEach(element => {
                   
                if (element.replacementProduct) {
                  this.createOrderJson = {
                    "price": element.productPrice,
                    "basePrice": element.basePrice,
                    "orderId": this.orderDetail.orderId,
                    "orderProductPreFixId": element.orderProductId,
                    "cancelItemPrefixId": element.orderProductPrefixId,
                    "email": this.orderDetail.email,
                    "newSkuName": this.selectedProductSKU,
                    "oldSkuName": element.skuName,
                    "productSellingPrice": element.productSellingPrice
                  }

                }
              });
            }else{
              this.orderDetail.productList = this.orderDetail.productList.map((item: any) => {
                return Object.assign(item, { "replacementProduct": true })
              })
            }
            
            this.orderDetail.productList = this.orderDetail.productList.map((item: any) => {
              return Object.assign(item, { "productMrp": Math.round(+(item.basePrice)+(+item.taxValueInAmount)) })
            })
            let itemQuantity:number=0
            this.orderDetail.productList.forEach(element => {
              itemQuantity+=element.quantity
            });
            this.orderDetail.itemQuantity = itemQuantity
            console.log(this.orderDetail, "chcjfcfgc++++++++++++++++++++++++++++++++")
            if(sessionStorage.getItem("ACTION") == "RETURN_ORDER" && false){
              this.orderDetail.productList = this.orderDetail.productList.filter((item)=> sessionStorage.getItem("replaceOrderPreId")==item.orderProductPrefixId )
            }
            if(this.orderDetail.appliedReturnCancelledType){
              this.visibleAppliedCancelledOrder = true;
              this.visibleCancelOrderSection = false;
            }
            console.log(this.orderDetail.orderStatusId, 'dsdfsfsdf')
            if(this.orderDetail.orderStatusId == 10){
              
              this.visibleCancelOrderSection = false;
            }
            if(this.orderDetail.appliedReturnCancelledType == "CREDIT_NOTE"){
              this.visibleGivenCNInfoSection = true;
            }
            if(this.orderDetail.appliedReturnCancelledType == "BANK_REFUND"){
              this.visibleGivenBankRefundInfoSection = true;
            }
            this.allProductList = value.productList
            this.productDetail = value.productList[0];
            this.setShippingInfo(this.productDetail);
            this.getProductOrderLogList();
            if (value.productList[0] && value.productList[0].orderOptions) {
              this.orderDetails = value.productList[0].orderOptions;
            }
            this.orderStatusId = value.orderStatusId;
            if (this.orderStatusId === 2) {
              this.isDisabled = true;
            }
          }
          this.cd.detectChanges();
        }));
      }
      // this.cd.detectChanges();
    });
    this.cd.detectChanges();
  }

  onItemChange(data) {
    const params: any = {};
    params.orderId = this.orderId;
    params.orderStatusId = data;
    console.log(data, "schcvhc");
    this.orderSandbox.changeOrderStatus(params);
  }

  onItemProductChange(data, id) {
    const params: any = {};
    params.id = id;
    params.orderStatusId = data;
    this.orderStatusSandbox.updateProductOrderStatus(params);
    this.subscriptions.push(this.orderStatusSandbox.OrderstatusUpdateProductLoaded$.subscribe(datas => {
      if (datas === true) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderDetails(param);
      }
    }));
  }

  changePayment(event) {
    // const FeatureValue = event.target.checked;
    // this.selectedPaidValue = value.paymentStatus === 1 ? true : false;
    const a=this.selectedPaidValue === true ? 1 : 0;
    const params: any = {};
    params.orderId = this.orderId;
    // params.paymentStatusId = +event;
    params.paymentStatusId = a;
    this.layoutSandbox.getChangePayment(params);
    this.subscriptions.push(this.layoutSandbox.changePaymentLoaded$.subscribe(data => {
      if (data === true) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderDetails(param);
      }
    }));
  }

  /**
   * download invoice for order
   *
   * @param dynamicBody creating dynamic body for the invoic detail
   */
  downloadInvoiceDetail(details, setting) {
    const params: any = {};
    params.orderId = details.orderId;
    params.orderPrefixId = details.orderPrefixId;
    this.orderSandbox.downloadInvoice(params);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  getOrderDetails(detail:any) {
    console.log(detail, "bjn")
    this.orderstatusmodel = detail;
    this.getDetailLoading = true;
    this.productDetail = detail;
    // this.setShippingInfo(detail);
    this.getProductOrderLogList();
  }

  initShippingForm() {
    this.shippingForm = this.formbuilder.group({
      id: ['', Validators.required],
      url: ['', Validators.required],
      actionTypeId: ['', Validators.required]
    });
  }

  getProductOrderLogList() {
    const params: any = {};
    params.orderProductId = this.productDetail.orderProductId;
    this.orderSandbox.orderLog(params);
  }

  updateShippingInfo() {
    if (!this.shippingForm.valid) {
      this.validateAllFormFields(this.shippingForm);
      return;
    }
    const params: any = {};
    // params.orderProductId = this.productDetail.orderProductId;
    // params.trackingUrl = this.shippingForm.controls['url'].value;
    // params.trackingNo = this.shippingForm.controls['id'].value;

    // params.orderId = this.productDetail.orderProductId;
    params.orderId = this.orderDetail.orderId
    params.trackingUrl = this.shippingForm.controls['url'].value;
    params.trackingNo = this.shippingForm.controls['id'].value;
    // params.actionTypeId = "1";
    params.actionTypeId = this.shippingForm.controls['actionTypeId'].value;
  
    this.orderStatusSandbox.updateProductTrackingStatus(params);
    this.subscriptions.push(this.orderStatusSandbox.TrackingstatusUpdateProductLoaded$.subscribe(data => {
      if (data) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderDetails(param);
      }
    }));
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  setShippingInfo(data) {
    this.shippingForm.controls['id'].setValue(data['trackingNo']);
    this.shippingForm.controls['url'].setValue(data['trackingUrl']);
    this.shippingForm.controls['actionTypeId'].setValue(data['actionTypeId']);
  }

  closeorderstatus() {
    this.orderstatusmodel = 0;
  }
  shipping(detail) {
    this.shippingmodel = detail;
    this.productDetail = detail;
    this.setShippingInfo(detail);
    this.getProductOrderLogList();
  }
  shippingclose() {
    this.shippingmodel = 0;
  }
  ordersstatushistory(details){
    this.ordershistory=details;
    this.productDetail = details;
    this.getProductOrderLogList();
  }
  closeorderhistory(){
    this.ordershistory=0;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

getProductVarient(productId:any){
  this.oldProductDetails=JSON.parse(productId).data
  this.productVarient = JSON.parse(productId).data.productVarient
  this.productVarientList = JSON.parse(productId).data.productvarientList
  this.selectedProductSKU={"skuName":this.oldProductDetails.skuName, "productId":this.oldProductDetails.productId}
  if(this.productVarient.length<1){
    this.isSkuSelected=false
  }
  // this.cd.detectChanges();
}

setNewVarient(varient:any, varientOption:any){
  this.varientType.push({[varient]:varientOption.id})
  this.varientType[0][varient]=varientOption.id
  this.selectVarient= Object.values(this.varientType[0])
  this.selectVarient = this.selectVarient.sort((a, b) => a - b);
  console.log(this.selectVarient, varient)
this.productVarientList.forEach(element => {
  let sortmenthod = element.productVarientOption.sort((a, b) => a - b);
  if (JSON.stringify(this.selectVarient) === JSON.stringify(sortmenthod)) {
        console.log(element)
        this.selectedProductSKU = element
        this.isSkuSelected=false
          
  }
});
this.cd.detectChanges();
}
async cancelOrrder(){
  this.showLoader = true;

  console.log("this.allReturnRequest",this.allReturnRequest)
  console.log("this.orderDetail.productList",this.orderDetail.productList)
const cancelItemsOnUc:any[]=[]
  this.orderDetail.productList.forEach((element:any) => {
    const getReturnItem:any = this.allReturnRequest.filter((item:any)=>item.orderProductId==element.orderProductId)[0]
    if(this.allReturnRequest.length>0 && getReturnItem){
      const codeList:any= (element.itemCode).split(',')
      const reversePickItems:any[]=[]
      codeList.forEach((item:any) => {
        reversePickItems.push({
          "reason":this.allReturnRequest[0].returnReason,
          "saleOrderItemCode": item
        })
      });
      cancelItemsOnUc.push({
        "saleOrderCode": this.orderDetail.orderPrefixId,
        "reversePickItems": reversePickItems,
        "actionCode": "WAC",
        "orderProductPrefixId":element.orderProductPrefixId,
        "orderProductId":element.orderProductId,
        "orderId":this.orderDetail.orderId,
        "facilityCode":element.facilityCode,
        "returnOrderId":getReturnItem.id
     })
    }
  });


   this.createReversePickup(cancelItemsOnUc)

}

createReversePickup(createReversePickup:any){
  console.log("createReversePickup",createReversePickup)
  this._layoutService.cancelOrder(createReversePickup).subscribe((res:any)=>{
    this.showLoader = false;
    if(res.status==200){
      this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:res.data,
        popupAction:"Ok",
        popupClass: "alert alert-warning",
        popupRoute: "sales/return-orders"
      })
      this.showCancelItemFromOldOrderPopup = false;
      this.cd.detectChanges();
    }else{
      this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Something went wrong!",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: "sales/return-orders"
      })
      this.showCancelItemFromOldOrderPopup = false;
      this.cd.detectChanges();
    }
  },(err:any)=>{
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"Something went wrong!",
      popupAction:"Ok",
      popupClass: "alert alert-danger",
      popupRoute: "sales/return-orders"
    })
  })
  this.cd.detectChanges();
}

createOrder(){
  this.createOrderJson.newSkuName=this.newProductSku
  this.showLoader=true
  this._layoutService.createOrder(this.createOrderJson).subscribe((res:any)=>{
    if(res.status==200){
      this.showRefundRequestPopup=false
      sessionStorage.removeItem("json")
      sessionStorage.removeItem("isReplaceOrder")
      this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Replacement order created successfully",
        popupAction:"Ok",
        popupClass: "alert alert-success",
        popupRoute: "/sales/return-orders"
      })
      this.showLoader=false
      this.cd.detectChanges();
    }else{
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "Something went wrong. Please try later",
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: "/sales/return-orders"
      })

    }
  },(err:any)=>{
    this.showLoader=false
    this.popupMessage.next({
      popupShow: true,
      popupHeader: "Message",
      popupMessage: "Something went wrong. Please try later",
      popupAction: "Ok",
      popupClass: "alert alert-danger",
      popupRoute: "/sales/return-orders"
    })

  })
  this.cd.detectChanges();
}

creditNote(){
  sessionStorage.setItem("creditNoteData",JSON.stringify(this.createOrderJson))
this.router.navigate(["/promotions/coupon-based/add"])
//   const currentDate = new Date()
//   const addThreeMonth = new Date(new Date().setMonth(new Date().getMonth()+3));
//   const couponCode = ("RC"+(Math.random() + 1).toString(36).substring(7)).toUpperCase();
//   const creditNoteJson = {
//     couponCode: couponCode,
// couponName: "Credit Note for Order Product "+this.createOrderJson.mainOrderProductPreFixId,
// couponType: 2,
// couponValue: +this.createOrderJson.productSellingPrice,
// emailRestrictions: this.orderDetail.email,
// endDate: addThreeMonth.toString(),
// endTime: "23:59",
// maxCouponUse: "1",
// maximumPurchaseAmount: 99999,
// minimumPurchaseAmount: +this.createOrderJson.productSellingPrice,
// noOfCoupon: 1,
// noOfMaxCouponUsePerUser: "1",
// startDate: currentDate.toString(),
// startTime: (currentDate.getHours()+':'+currentDate.getMinutes()).toString(),
// orderId:this.createOrderJson.orderProductPrefixId,
// status: 1
//   }
// this._layoutService.addCouponBasedPromotion(creditNoteJson).subscribe((res:any)=>{
//   this.popupMessage.next({
//     popupShow: true,
//     popupHeader:"Message",
//     popupMessage:"Credit note for this Order crreate successfully",
//     popupAction:"Ok",
//     popupClass: "alert alert-success",
//     popupRoute: "/sales/return-orders"
//   })

//   this.cd.detectChanges();
// },(err:any)=>{

// })


}


showRefund(){
  const orderId = sessionStorage.getItem("cancelReturnOrderId");
  this._layoutService.getRefundInfo({orderId: Number(orderId)}).subscribe((res:any)=>{
    console.log(res, "Neeraodsfsfdasfas+++++++++++++++++")
  if(res.status == 1){  
    
  this.cnAmountToCreate = res.data.totalRefundAmount;
  this.refundInfoRecords = res.data;  
  this.showRefundInfoPopup = true;
  this.getRefundInfo()
  this.cd.detectChanges();
  }
  })
}

showRejectRequestModal(action:boolean){
  this.showRejectRequestPopup = action;
}

showCancelOrderModal(action:boolean){
  this.showCancelOrderRequestPopup =action;
}

showCreditNoteModal(action: boolean){

  if(action){
  const orderId = sessionStorage.getItem("cancelReturnOrderId");

  this._layoutService.getRefundInfo({orderId: Number(orderId)}).subscribe((res:any)=>{
    
  if(res.status == 1){  
  this.cnAmountToCreate = res.data.totalRefundAmount;
  this.showCreditNotePopup = action;
  this.cd.detectChanges();
  }
  })
}else{
  this.showCreditNotePopup = action;
  this.showRefundInfoPopup = action;
}
  
}


closeRefundInfoPopup(){
  this.showRefundInfoPopup = false;
}
refundMoney(){
  this.refundActive=true
}

  refundSubmit() {
    const orderId = sessionStorage.getItem("cancelReturnOrderId");
    const cancelOrderRequestId = sessionStorage.getItem("cancelOrderRequestId");
    const orderPrefixId = sessionStorage.getItem("cancelReturnOrderPrefixId");
    const orderCancelRequest:any[]=[] 
    const pendingRequest:any = this.allCancelRequest.filter((item:any)=>item.cancelRequestStatus=='Pending')[0]
    const selectCancelproductId:any[]=[]
    this.allPendingCancelRequest.forEach(element => {
      const itemCode:any = this.orderDetail.productList.filter((item:any)=>item.orderProductId==element.orderProductId)[0]
      selectCancelproductId.push(element.orderProductId)
      orderCancelRequest.push({
        orderPrefixId:pendingRequest.orderPrefixId,
        cancelRequestReason:pendingRequest.cancelRequestReason,
        itemCode:itemCode.itemCode
      })
    });
    const refundJson = { 
      "orderId": (orderId).toString(), 
      cancelOrderRequestId: cancelOrderRequestId, 
      action: "CANCEL_ORDER", 
      orderPrefixId,
      orderProductId:selectCancelproductId.toString(),
      paymentName: this.paymentMethod==8?'paytm':'ingenico',
      orderCancelRequest:orderCancelRequest,
      bankRequests:this.allBankTransaction
    }
    this.showLoader = true;
    const actionTaken = sessionStorage.getItem("ACTION");
    let redirectUrl = '/sales/return-orders';
    if(actionTaken == "CANCEL_ORDER"){
      redirectUrl = "/sales/cancel-orders/list";
    }
console.log("refundJson",refundJson)
        this._layoutService.refundSubmit(refundJson).subscribe((res: any) => {
          if (res.status == 1) {
            //this.updateOrderProductReturn()
            this.popupMessage.next({
              popupShow: true,
              popupHeader: "Message",
              popupMessage: res.message,
              popupAction: "Ok",
              popupClass: "alert alert-success",
              popupRoute: redirectUrl
            })
          } else {
            this.popupMessage.next({
              popupShow: true,
              popupHeader: "Message",
              popupMessage: res.message,
              popupAction: "Ok",
              popupClass: "alert alert-warning",
              popupRoute: redirectUrl
            })
          }
          this.showLoader = false;
          this.cd.detectChanges();
        })
  }

updateOrderProductReturn(){
  this._layoutService.updateOrderProductReturn(this.createOrderJson.cancelItemPrefixId).subscribe((res:any)=>{

  })
}


cancelOrderAndSendCancelledOrderOnUC(orderPrefixId:any, orderId, orderProductPrefixId:any, action:any){
  const cancelOrderRequestId = sessionStorage.getItem("cancelOrderRequestId");
  let json:any = {
    "orderId":Number(orderId),
    "saleOrderCode":orderPrefixId,
    "cancellationReason":"APPROVED_BY_BACKEND",
    "cancellationRemark":"Approved",
    cancelOrderRequestId
  }
  let statusId:number;
  if(action==1){
    json.cancellationRemark="Approved"
    statusId=9
  }
  if(action == 2){
    json.cancellationRemark="Rejected"
    statusId=10
  }
  if(action==3){
    json.cancellationRemark="CancelledCODOrder"
    statusId=9
  }
  this._service.cancelOrderRequest(json).subscribe((res:any)=>{
    
    if(action == 1 && res.status == 1 && res.data == "SUCCESS"){
      const creditNoteAmount = this.cnAmountToCreate;
    this._layoutService.createCreditNote({order_id: orderId, order_product_id: this.orderProductIds.toString(), creditNoteAmount:creditNoteAmount}).subscribe((result:any) => {
      this.showLoader = false;
      if(result.status == 1){
        this.visibleCancelOrderSection = false;
        this.visibleSuccessMessage = true;
        this.showCreditNotePopup = false;        
        this.popupMessage.next({
          popupShow: true,
          popupHeader: "Message",
          popupMessage: "Credit note created successfully",
          popupAction: "Ok",
          popupClass: "alert alert-success",
          popupRoute: "sales/cancel-orders/list"
        })
        this.cd.detectChanges();

       }else{
        this.popupMessage.next({
          popupShow: true,
          popupHeader: "Message",
          popupMessage: "Something went wrong",
          popupAction: "Ok",
          popupClass: "alert alert-danger",
          popupRoute: "/sales/cancel-orders/list"
        })
       }
    })
    }
    this.showLoader = false;
    // if(res.status == 1){
    //   this.visibleCancelOrderSection = false;
    //   this.visibleSuccessMessage = true;
    //   this._router.navigate(["sales/cancel-orders/list"]);
    //   this.cd.detectChanges();
      
    //  }

     if(res.status == 1 && action == 3){
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "Order cancelled successfully",
        popupAction: "Ok",
        popupClass: "alert alert-success",
        popupRoute: "sales/cancel-orders/list"
      })
      this.cd.detectChanges();
     }

     if(res.status == 1 && action == 2){
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "Request rejected successfully",
        popupAction: "Ok",
        popupClass: "alert alert-success",
        popupRoute: "sales/cancel-orders/list"
      })
      this.cd.detectChanges();
     }
    // this.showRejectRequestPopup = false;
    // this.showCancelOrderRequestPopup = false;
     //this._router.navigate(["sales/cancel-orders/list"]);
     this.cd.detectChanges();
  
  })
}

async checkStatusOnUc(orderPrefixId:any, orderId:any, action:any){
  if(orderPrefixId){
    this._service.getSaleOrder(orderPrefixId).subscribe(async (res:any) => {
      
      if(res.data == "ORDER_NOT_FOUND_ON_UC"){
        console.log(res.message)
        this.popupMessage.next({
          popupShow: true,
          popupHeader: "Message",
          popupMessage: "Something went wrong",
          popupAction: "Ok",
          popupClass: "alert alert-danger",
          popupRoute: "/sales/cancel-orders/list"
        })
        this.showLoader = true;
        this.cd.detectChanges();
      }else{
        this.cd.detectChanges();
        const cancelReqFilter:any = this.allCancelRequest.filter((item:any)=>item.cancelRequestStatus=='Pending')
        const amount:any = cancelReqFilter.reduce((a:any, b:any)=> Number(a) + Number(b.totalAmount),0)
        const orderProductIdList:any[]=[]
       const itemsCodeList:any[]=[]
        this.allPendingCancelRequest.forEach(element => {
          orderProductIdList.push(element.orderProductId)
          itemsCodeList.push(element.itemCode)
        });
        const payloadCooking:any=[{
          orderPrefixId,
          "cancelRequestReason": cancelReqFilter[0].cancelRequestReason,
          itemCode:itemsCodeList.toString()
       }];
        console.log("this.allPendingCancelRequest",this.allPendingCancelRequest)
        console.log("payloadCooking",payloadCooking)
        this._layoutService.partiaOrderCancelItem(payloadCooking).subscribe((resp:any)=>{
          if(resp.status==200 || (res.data && res.data.returns && res.data.returns.length>0)){
            const json={
              creditNoteAmount:amount,
              order_id:this.allPendingCancelRequest[0].orderId,
              order_product_id:orderProductIdList.toString()
            }
            this._service.createCreditNote(json).subscribe(resC=>{
              if(resC.status==1){
              this.popupMessage.next({
                popupShow: true,
                popupHeader: "Message",
                popupMessage: "Credit note issues successfully",
                popupAction: "Ok",
                popupClass: "alert alert-success",
                popupRoute: "/sales/cancel-orders/list"
              })
            }else{
              this.popupMessage.next({
                popupShow: true,
                popupHeader: "Message",
                popupMessage: resC.message,
                popupAction: "Ok",
                popupClass: "alert alert-danger",
                popupRoute: "/sales/cancel-orders/list"
              })
            }
              this.showLoader=false
              this.cd.detectChanges();
            })
          }else{
            this.popupMessage.next({
              popupShow: true,
              popupHeader: "Message",
              popupMessage: resp.message,
              popupAction: "Ok",
              popupClass: "alert alert-danger",
              popupRoute: "/sales/cancel-orders/list"
            })
            this.showLoader=false
          }
          this.cd.detectChanges();
        })
        console.log("json",amount)
        this.cd.detectChanges();
      }
    })

  }
}

async createCreditNoteForCancelOrder(action:any){
  console.log("asdasdasd",action)
  this.showLoader = true;
  this.creditNoteBtnDisabled=true
  this._service.getOrderCancelRequestsByOrderId(this.orderDetail.orderId).subscribe(res=>{
    console.log("this.rejectItemsListressssssssss",res)
    console.log("this.rejectItemsList",this.orderDetail.productList)
    const allCancelRequst:any=res.data
    const rejectRequestList:any[]=[]
    allCancelRequst.forEach((element:any) => {
      if(element.cancelRequestStatus=='Pending'){
        element.cancelRequestStatus='Rejected'
        const findIndex = this.orderDetail.productList.findIndex(item=>item.orderProductId==element.orderProductId)
        const rejectItemCode:any = this.orderDetail.productList[findIndex]
        element.itemCode=rejectItemCode.itemCode
        rejectRequestList.push(element)
      }
    });
    this.getRefundInfo()
    this.showLoader = true;
    const orderPrefixId = sessionStorage.getItem("cancelReturnOrderPrefixId");
    const orderId = sessionStorage.getItem("cancelReturnOrderId");
    this.checkStatusOnUc(orderPrefixId, orderId, action)
    // this._layoutService.partiaOrderCancelItem(rejectRequestList).subscribe((res:any)=>{
    //   if(res.status==200){

    //   }else{
    //     this.popupMessage.next({
    //       popupShow: true,
    //       popupHeader: "Message",
    //       popupMessage: "Something went wrong. Please try later",
    //       popupAction: "Ok",
    //       popupClass: "alert alert-danger",
    //       popupRoute: "/sales/cancel-orders/list"
    //     })
    //   }
    //   this.showLoader = false;
    //   this.cd.detectChanges();
    // })
    this.cd.detectChanges();
  })

}

async createCreditNoteForReturnOrder(){
    this.showLoader = true;
console.log("this.allReturnOrderPending",this.allReturnOrderPending)
  const amount:any = this.allPendingReturnRequest.reduce((a:any, b:any)=> Number(a) + Number(b.refundAmount),0)
  const orderProductIdList:any[]=[]
  this.allPendingReturnRequest.forEach(element => {
    orderProductIdList.push(element.orderProductId)
  });
  const json={
    creditNoteAmount:amount,
    order_id:this.allPendingReturnRequest[0].orderId,
    order_product_id:orderProductIdList.toString()
  }

  this._layoutService.createCreditNote(json).subscribe((result:any) => {
    console.log(result, "Nero result +++++++++++++++++++");
    if(result.status == 1){
      this.showLoader = false;
      this.visibleReturnOrderSection = false;
      this.showCnPopForReturnItem = false;
      this._router.navigate(['sales/return-orders'])
      this.cd.detectChanges();
     }else{
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "Something went wrong. Please try later",
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: "/sales/return-orders"
      })

     }
  })
}

async showRejectReturnRequestModal(action: boolean){
  this.showReturnRejectRequestPopup = action;
}

async rejectReturnRequest(){
  const returnRequestId = sessionStorage.getItem("returnRequestId");
  this._layoutService.rejectReturnRequest({returnRequestId: returnRequestId}).subscribe((result:any) => {
    console.log(result, "Nero result +++++++++++++++++++");
    if(result.status == 1){
      this.visibleReturnOrderSection = false;
      this.showReturnRejectRequestPopup = false;
      this._router.navigate(['sales/return-orders'])
     // this.cd.detectChanges();
     }
  })
}

async showCancelItemFromOldOrderModal(action: boolean){
  this.showCancelItemFromOldOrderPopup = action;
  this.returnItems()
}

closeCnPopForReturnItem(){
  this.showCnPopForReturnItem=false
}

async showCnModalForReturnItem(action: any){
  this.showLoader = true;
  this.returnItems()
  const getReturnStatus:any = await this.getSaleReturnOrder()
  setTimeout(() => {
const filter:any = getReturnStatus.length>0 && getReturnStatus.filter((item:any)=>item.statusCode=='COMPLETE')
console.log("filterfilter",filter.length,this.allReturnRequest.length)
if(filter && filter.length==this.allReturnRequest.length){
  if(action=='CN'){
    this.showCnPopForReturnItem = true;
    console.log("this.allPendingReturnRequest",this.allPendingReturnRequest)
    const amount:any = this.allPendingReturnRequest.reduce((a:any, b:any)=> Number(a) + Number(b.refundAmount),0)
    this.cnAmountToCreate = amount
  }else{
    this.sendEmailPopUp=true
  }
}else{
  this.popupMessage.next({
    popupShow: true,
    popupHeader: "Message",
    popupMessage: "CN can not be created as Product not received in warehouse yet",
    popupAction: "Ok",
    popupClass: "alert alert-danger",
    popupRoute: "/sales/return-orders"
  })
}
this.showLoader=false
this.cd.detectChanges();
}, 2000);
//   if (action) {
//     const orderId = sessionStorage.getItem("cancelReturnOrderId");
//     const cancelReturnOrderProductId = sessionStorage.getItem("cancelReturnOrderProductId");
//     const returnType = sessionStorage.getItem("ACTION");
//     const isItemRcvd = await this.checkItemReceivedInWareHouse(1);
//     if(isItemRcvd == "ITEM_NOT_RCVD"){
//       this.showLoader = false;
//        this.popupMessage.next({
//          popupShow: true,
//          popupHeader: "Message",
//          popupMessage: "CN can not be created as Product not received in warehouse yet",
//          popupAction: "Ok",
//          popupClass: "alert alert-danger",
//          popupRoute: "/sales/return-orders"
//        })

//        this.cd.detectChanges();
//     }else if(isItemRcvd == "SOMETHING_WENT_WRONG_TRY_LATER"){
//         this.showLoader = false;
//        this.popupMessage.next({
//          popupShow: true,
//          popupHeader: "Message",
//          popupMessage: "Something went wrong. Please try later",
//          popupAction: "Ok",
//          popupClass: "alert alert-danger",
//          popupRoute: "/sales/return-orders"
//        })

//        this.cd.detectChanges();
//     }else{
   
//     if (returnType == "FULL_ORDER_RETURN" || true) {
//       this._layoutService.getRefundInfo({ orderId: Number(orderId) }).subscribe((res: any) => {
//         if (res.status == 1) {
//           this.cnAmountToCreate = res.data.totalRefundAmount;

//           this.showCnPopForReturnItem = action;
//           this.cd.detectChanges();
//         }
//       })

//     } else {
//     this._layoutService.getCnInfoOfOrderReturn({ orderId: Number(orderId), orderProductId: Number(cancelReturnOrderProductId) }).subscribe((res: any) => {
//       console.log(res.data.refundInfo, "Neeraodsfsfdasfas+++++++++++++++++")
//       if (res.status == 1) {
//         this.cnAmountToCreate = res.data.refundInfo.reduce((a:any, b:any) => a + parseInt(b.total), 0)
// console.log(this.cnAmountToCreate)
//         this.showCnPopForReturnItem = action;
//         this.cd.detectChanges();
//       }
//     })
//   }
//   }

//   } else {
//     this.showCnPopForReturnItem = action;
//     this.cd.detectChanges();
//   }


  //this.returnOrderItemPrice = parseFloat(sessionStorage.getItem("returnOrderItemPrice"));
  
}



  async showRefundInfoForOrderReturn(action: boolean) {
    if (action) {

      const orderId = sessionStorage.getItem("cancelReturnOrderId");
      const cancelReturnOrderProductId = sessionStorage.getItem("cancelReturnOrderProductId");
      const returnType = sessionStorage.getItem("ACTION");

      const isItemRcvd = await this.checkItemReceivedInWareHouse(1);
      if(isItemRcvd == "ITEM_NOT_RCVD"){
        this.showLoader = false;
         this.popupMessage.next({
           popupShow: true,
           popupHeader: "Message",
           popupMessage: "Refund can not be initiated as Product not received in warehouse yet",
           popupAction: "Ok",
           popupClass: "alert alert-danger",
           popupRoute: "/sales/return-orders"
         })

         this.cd.detectChanges();
      }else if(isItemRcvd == "SOMETHING_WENT_WRONG_TRY_LATER"){
          this.showLoader = false;
         this.popupMessage.next({
           popupShow: true,
           popupHeader: "Message",
           popupMessage: "Something went wrong. Please try later",
           popupAction: "Ok",
           popupClass: "alert alert-danger",
           popupRoute: "/sales/return-orders"
         })

         this.cd.detectChanges();
      }else{
      if (returnType == "FULL_ORDER_RETURN" && false) {
        this._layoutService.getRefundInfo({ orderId: Number(orderId) }).subscribe((res: any) => {
          if (res.status == 1) {
            this.cnAmountToCreate = res.data.totalRefundAmount;
            this.refundInfoRecords = res.data;
            this.showReturnRefundItemInfoPopup = action;
            this.cd.detectChanges();
          }
        })

      } else {

  console.log("this.allPendingReturnRequest",this.allPendingReturnRequest)
    const amount:any = this.allPendingReturnRequest.reduce((a:any, b:any)=> Number(a) + Number(b.refundAmount),0)
    
    const orderProductId:any=this.allPendingReturnRequest.map((item:any) => item.orderProductId).join(',');
      this._layoutService.getRefundInfoOfOrderReturn({ orderId: orderId, orderProductId: orderProductId}).subscribe((res: any) => {
        
        if (res.status == 1) {
          this.cnAmountToCreate = res.data.totalRefundAmount;
          this.refundInfoRecords = res.data;
          this.showReturnRefundItemInfoPopup = action;
          this.cd.detectChanges();
        }
      })
    }
  }

    } else {
      this.showReturnRefundItemInfoPopup = action;
      this.cd.detectChanges();
    }
    this.cd.detectChanges();
  }

  async refundSubmitForReturnItem() {
    const orderId = sessionStorage.getItem("cancelReturnOrderId");
    const returnRequestId = sessionStorage.getItem("returnRequestId");
    console.log("this.allPendingReturnRequest",this.allPendingReturnRequest)
    const orderProductId:any=this.allPendingReturnRequest.map((item:any) => item.orderProductId).join(',');
    const refundJson = {
      "orderId": (orderId).toString(), 
      orderProductId:orderProductId,
      orderPrefixId:this.orderDetail.orderPrefixId,
      bankRequests:this.allBankTransaction
    }
    console.log("refundJson",refundJson)
    const returnType = sessionStorage.getItem("ACTION");
    this.showLoader = true;
    if (returnType == "FULL_ORDER_RETURN" && false) {
      const refundJson = { "orderId": (orderId).toString(), orderProductId, cancelOrderRequestId: returnRequestId, action: "FULL_ORDER_RETURN" }
      this._layoutService.refundSubmit(refundJson).subscribe((res: any) => {
        if (res.status != 0) {
          
          
              this.showLoader = false;
             // this.showReturnRefundItemInfoPopup =false
              this.popupMessage.next({
                popupShow: true,
                popupHeader: "Message",
                popupMessage: "Refund initiated successfully",
                popupAction: "Ok",
                popupClass: "alert alert-success",
                popupRoute: "/sales/return-orders"
              })

              this.cd.detectChanges();
           
          
        } else {
          this.showLoader = false;
          this.popupMessage.next({
            popupShow: true,
            popupHeader: "Message",
            popupMessage: res.message,
            popupAction: "Ok",
            popupClass: "alert alert-danger",
            popupRoute: "/sales/return-orders"
          })
          this.cd.detectChanges();

        }
        this.cd.detectChanges();
      })

    }else{
        this._layoutService.refundSubmitForReturnItem(refundJson).subscribe((res: any) => {
          
          if (res.status != 0) {
            
            
                this.showLoader = false;
               // this.showReturnRefundItemInfoPopup =false
                this.popupMessage.next({
                  popupShow: true,
                  popupHeader: "Message",
                  popupMessage: "Refund initiated successfully",
                  popupAction: "Ok",
                  popupClass: "alert alert-success",
                  popupRoute: "/sales/return-orders"
                })

                this.cd.detectChanges();
             
            
          } else {
            this.showLoader = false;
            this.popupMessage.next({
              popupShow: true,
              popupHeader: "Message",
              popupMessage: res.message,
              popupAction: "Ok",
              popupClass: "alert alert-danger",
              popupRoute: "/sales/return-orders"
            })
            this.cd.detectChanges();

          }
          this.cd.detectChanges();
        })

      }
      
    

  }

  async createOrderPopup(val:boolean){
    const isItemRcvd = await this.checkItemReceivedInWareHouse(1);
    if(isItemRcvd == "ITEM_NOT_RCVD"){
      this.showLoader = false;
       this.popupMessage.next({
         popupShow: true,
         popupHeader: "Message",
         popupMessage: "Replacement can not be initiated as Product not received in warehouse yet",
         popupAction: "Ok",
         popupClass: "alert alert-danger",
         popupRoute: "/sales/return-orders"
       })

       this.cd.detectChanges();
    }else if(isItemRcvd == "SOMETHING_WENT_WRONG_TRY_LATER"){
        this.showLoader = false;
       this.popupMessage.next({
         popupShow: true,
         popupHeader: "Message",
         popupMessage: "Something went wrong. Please try later",
         popupAction: "Ok",
         popupClass: "alert alert-danger",
         popupRoute: "/sales/return-orders"
       })

       this.cd.detectChanges();
    }else{
    this._layoutService.getProductDetailBySku(this.newProductSku).subscribe((res: any) => {
      if(res.status==200){
      this.showRefundRequestPopup=val
      this.newProductDetails=res.data
      }else{
        this.popupMessage.next({
          popupShow: true,
          popupHeader:"Message",
          popupMessage:"Something went wrong!",
          popupAction:"Ok",
          popupClass: "alert alert-danger",
          popupRoute: ""
        })
      }
      this.cd.detectChanges();
    })
  }
  }

  async getSaleReturnOrder(){
    const res = await this._service.getSaleOrderForReturn(this.orderDetail.orderPrefixId).toPromise().then( (saleOrder: any) => {
      const result:any = saleOrder.data.returns;
      console.log("result",result)
      this.cd.detectChanges();
  if(saleOrder.status==1 && result.length>0){
    console.log("result",result)
    return result
  }else{
    return []
  }
    })
    return res
  }

  async checkItemReceivedInWareHouse(val:any){
    const orderPrefixId = sessionStorage.getItem("cancelReturnOrderPrefixId");
    const returnRequestData:any = JSON.parse(sessionStorage.getItem("returnRequestData"));
    const returnType = sessionStorage.getItem("ACTION");

    
    
    const t = await this._service.getSaleOrderForReturn(orderPrefixId).toPromise().then( (saleOrder: any) => {

      if (saleOrder && saleOrder.status == 1) {
        if(val==1){
        const returns:any[] = saleOrder.data.returns;
        if (returns.length > 0) {
          if (returnType == "FULL_ORDER_RETURN" || true) {
            let returnComplete:boolean=true
            returns.forEach(element => {
              if(element.statusCode!="COMPLETE"){
                returnComplete=false
              }
            });

            if ((returns && returnComplete) || sessionStorage.getItem("noValidation")=="YES") {

              return "ITEM_RCVD"

            } else {
              return "ITEM_NOT_RCVD"
            }
          }else{
            for (let i = 0; i < returns.length; i++) {
              
              if ((returns[i].code == returnRequestData.rpCode && returns[i].statusCode == "COMPLETE") || sessionStorage.getItem("noValidation")=="YES") {
                
                return "ITEM_RCVD"
          
              }else{
                return "ITEM_NOT_RCVD"
              }
            }
          }

        }
      }else{

        return saleOrder.data
      }

      }else{
        this.showLoader = false;
        return "SOMETHING_WENT_WRONG_TRY_LATER"
      }

      this.cd.detectChanges();



    })

    return t;
  }
  async sendEmailToCustomerPopUp(val:any){
    const isItemRcvd = await this.checkItemReceivedInWareHouse(1);
    if(isItemRcvd == "ITEM_NOT_RCVD"){
      this.showLoader = false;
       this.popupMessage.next({
         popupShow: true,
         popupHeader: "Message",
         popupMessage: "Refund can not proceed as Product not received in warehouse yet",
         popupAction: "Ok",
         popupClass: "alert alert-danger",
         popupRoute: "/sales/return-orders"
       })
    }else if(isItemRcvd == "SOMETHING_WENT_WRONG_TRY_LATER"){
        this.showLoader = false;
       this.popupMessage.next({
         popupShow: true,
         popupHeader: "Message",
         popupMessage: "Something went wrong. Please try later",
         popupAction: "Ok",
         popupClass: "alert alert-danger",
         popupRoute: "/sales/return-orders"
       })

      }else{
        this.sendEmailPopUp=val
      }
      this.cd.detectChanges();
    
  }
  sendEmailForRefund(){
    const returnRequestData = JSON.parse(sessionStorage.getItem("returnRequestData"))
    const payload= {
      email: this.orderDetail.email,
      orderPrefixId: this.orderDetail.orderPrefixId,
      name: this.orderDetail.shippingFirstname,
      orderProductPrefixId: returnRequestData.orderProductPrefixId,
      orderFullCOD: (this.paymentMethod==2 && this.orderDetailsView.creditNoteDiscount==0)?"YES":"NO",
      returnRequestId:sessionStorage.getItem("returnRequestId")
    }
    this.sendEmailPopUp=false
    this._service.sendEmailForRefund(payload).subscribe(res=>{
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "Email sent successfully",
        popupAction: "Ok",
        popupClass: "alert alert-success",
        popupRoute: "/sales/return-orders"
      })
      this.cd.detectChanges();
    },err=>{
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "Something went wrong. Please try agin.",
        popupAction: "Ok",
        popupClass: "alert alert-danger",
        popupRoute: "/sales/return-orders"
      })
      this.cd.detectChanges();
    })    
  }
  checkEmailSendForCodOrder(){
    const returnRequestData = JSON.parse(sessionStorage.getItem("returnRequestData"))
    const json = {
      subject:"Bank Details for Refund Process",
      orderId: returnRequestData.orderProductPrefixId
    }
    this._service.checkEmailSend(json).subscribe((res:any)=>{
      if(res.status==200){
        this.markAsRefundBtn=true
      }
      this.cd.detectChanges();
    },err=>{
      this.markAsRefundBtn=false
    })
  }

  markAsRefund(){
    const returnRequestData = JSON.parse(sessionStorage.getItem("returnRequestData"))
    const json = {
      returnId:returnRequestData.id,
      orderProductPrefixId: returnRequestData.orderProductPrefixId,
      orderId: this.orderDetail.orderId,
      refundAmount: returnRequestData.totalAmount,
      email: this.orderDetail.email,
    }
    this._service.markAsRefunded(json).subscribe((res:any)=>{
      this.popupMessage.next({
        popupShow: true,
        popupHeader: "Message",
        popupMessage: "Order Item successfully mark as refunded",
        popupAction: "Ok",
        popupClass: "alert alert-success",
        popupRoute: "/sales/return-orders"
      })
      this.cd.detectChanges();
    },err=>{
      this.markAsRefundBtn=false
    })
  }



  async adminCancelOrder(action: boolean){
    if(this.orderDetail.productList.length>0 || this.orderDetailsView.creditNoteDiscount>0 || this.orderDetailsView.productPromotionDiscountTotal>0){
      this.cancelList=[]
      this.orderDetail.productList.forEach((element:any) => {
        if(element.orderStatusId==1 || element.orderStatusId==16 || element.orderStatusId==33 || element.orderStatusId==34 || element.orderStatusId==35){
          this.addCancelList(element)
        }
      });
    }
    if(this.cancelList.length>0){
      this.adminCancelOrderPopup = action;
    }else{
      this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Select Order Item for Cancellation",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
    }
  }

  CancelFullOrderAdmin(){
    this.showLoader = true;
    if(this.cancelList.length>0){
    this._layoutService.cancelOrderByAdmin(this.cancelList).subscribe((res:any)=>{
      if(res.status==200){
        this.showLoader = false;
        this.router.navigate(['/sales/orders/list']);
        this.popupMessage.next({
          popupShow: true,
          popupHeader:"Message",
          popupMessage:"Order Cancelled successfully",
          popupAction:"Ok",
          popupClass: "alert alert-success",
          popupRoute: ""
        })
        this.adminCancelOrderPopup = false;
    this.cd.detectChanges();
  }else{
    this.adminCancelOrderPopup = false;
  }
})
    }else{
      this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Select Order Item for Cancellation",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
    }
}

addRemark(val:any){
if(val){
console.log(val)
const userDetails:any = JSON.parse(localStorage.getItem("adminUser"))
const json = {
  "orderId":this.orderDetail.orderId,
  "orderPrefixId":this.orderDetail.orderPrefixId,
  "userName":userDetails.firstName+" "+userDetails.lastName,
  "email":userDetails.email,
  "remarks":val
}
console.log(json)
this._layoutService.addRemarks(json).subscribe((res:any)=>{
  this.getRemarks()
},err=>{
  this.popupMessage.next({
    popupShow: true,
    popupHeader:"Message",
    popupMessage:"Something went wrong",
    popupAction:"Ok",
    popupClass: "alert alert-danger",
    popupRoute: ""
  })  
})
}else{
  this.popupMessage.next({
    popupShow: true,
    popupHeader:"Message",
    popupMessage:"Please enter remark",
    popupAction:"Ok",
    popupClass: "alert alert-danger",
    popupRoute: ""
  })
}
}

getRemarks(){
  this._layoutService.getRemarks(this.orderDetail.orderId).subscribe((res:any)=>{
    if(res.status==200){
      if(res.data && res.data.length > 0){
        this.remarkData = res.data
        this.remarkData = res.data.map((item)=> {
          const storeValue = item.createdDate;
          const date = new Date(storeValue);
          const updatedDate = new Date(date.setTime(date.getTime() + (5*60*60*1000)+ (30 * 60 * 1000)));
          delete item.createdDate
          return Object.assign(item, {createdDate:updatedDate})
        })
      }
      console.log(this.remarkData)
    }else{
      this.remarkData=[]
    }
    this.cd.detectChanges();
  })
}

checkRequest(val:any){
  this.statusid = val
}


UpdateReturnStatus(val:any){
  const params: any = {};
  params.orderId = val;
  params.returnStatus = Number(this.statusid);

  this._layoutService.UpdateReturnStatus(params).subscribe((res:any)=>{
    if(res.status==1){
      this.req.nativeElement.value = 'none';
   }
    this.cd.detectChanges();
  })

}
exportAsXLSX(){
  const remarkExportData=this.remarkData;
  let remarkData:any[]=[]
  console.log("data", this.remarkData)

  remarkExportData.forEach((item:any, i)=>{
    const dateString = item.createdDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      // second: 'numeric',
    });

    remarkData.push({
      "S.No":i+1, "User name":item.userName,"Email":item.email,"Remark":item.remarks,"Date":formattedDate
    })
  })
  this.excelService.exportAsExcelFile(remarkData, 'remark-report')
}

sendCheckedOrderStatus(orderStatusId:any,orderId:any,orderProductId:any){
  this.orderStatusIdValue=orderStatusId;
  this.orderIdvalue=orderId;
}

sendCheckedOrderProductStatus(orderStatusId:any,orderId:any,orderProductId:any){
  console.log("dataNN orderProductId>",orderProductId)
  this.orderStatusIdValue=orderStatusId;
  this.orderIdvalue=orderId;
  this.orderProductIdValue=orderProductId;
}
updateOrderProductStatus(){
  const params: any = {};
  if(this.orderIdvalue && this.orderProductIdValue){
  
  params.orderId = this.orderIdvalue;
  params.orderProductId = this.orderProductIdValue;
  params.orderStatusId = Number(this.orderStatusIdValue);
  }else{
    params.orderId = this.orderIdvalue;
    params.orderStatusId = Number(this.orderStatusIdValue);

  }
  this._layoutService.UpdateOrderStatus(params).subscribe((res:any)=>{
    this.modelOpenStatus(false);
    this.cd.detectChanges();
  })
}
modelOpenStatus(modelStatus:any){
  this.orderStatusDelivery=modelStatus;

}

selectRejectItem(event:any, item:any){
  if(event.target.checked){
      this.rejectItemsList.push(item)
  }else{
    const findIndex = this.rejectItemsList.findIndex(data=>data.orderProductId==item.orderProductId)
    this.rejectItemsList.splice(findIndex, 1)
  }
  console.log("this.rejectItemsList",this.rejectItemsList)
}

rejectSelectedCacncelItems(){
  this.showLoader=true
  this._service.getOrderCancelRequestsByOrderId(this.orderDetail.orderId).subscribe(res=>{
    console.log("this.rejectItemsListressssssssss",res)
    const allCancelRequst:any=res.data
    const rejectRequestList:any[]=[]
    allCancelRequst.forEach((element:any) => {
      if(element.cancelRequestStatus=='Pending' && this.rejectItemsList.some(item=>item.orderProductId==element.orderProductId)){
        element.cancelRequestStatus='Rejected'
        const findIndex = this.rejectItemsList.findIndex(item=>item.orderProductId==element.orderProductId)
        const rejectItemCode:any = this.rejectItemsList[findIndex]
        element.itemCode=rejectItemCode.itemCode
        rejectRequestList.push(element)
      }
    });
    console.log("rejectRequestListrejectRequestListrejectRequestListrejectRequestListrejectRequestListrejectRequestList",rejectRequestList)
    if(rejectRequestList.length>0){
      this._service.cancelOrderRequest(rejectRequestList).subscribe(res=>{
        this.popupMessage.next({
          popupShow: true,
          popupHeader:"Message",
          popupMessage:"Order Cancel Items rejected.",
          popupAction:"Ok",
          popupClass: "alert alert-success",
          popupRoute: "sales/cancel-orders/list"
        })  
        this.showLoader=false
        this.cd.detectChanges();
      })
    }else{
      this.popupMessage.next({
        popupShow: true,
        popupHeader:"Message",
        popupMessage:"Select Cancel Items.",
        popupAction:"Ok",
        popupClass: "alert alert-danger",
        popupRoute: ""
      })
      this.cd.detectChanges();
    }
    this.cd.detectChanges();
  })

}
modelCacnelPopup(val:any){
  this.showRejectRequestPopup = false
  this.orderStatusHistoryPopup=val
  this.getRefundInfo()
  this.cd.detectChanges();   
}

getRefundInfo(){
  this.allPendingCancelRequest=[]
  this._service.getOrderCancelRequestsByOrderId(this.orderDetail.orderId).subscribe(res=>{
    this.getAllBankTransaction()
    this.allCancelRequest = res.data
    const requset = this.allCancelRequest.filter(item=>item.cancelRequestStatus=='Pending')
    this.orderDetail.productList.forEach((element:any) => {
      if(requset.some((item:any)=>item.orderProductId==element.orderProductId)){
      this.allPendingCancelRequest.push(element) 
      }
    });
    if(this.orderDetailsView.creditNoteDiscount!=0){
      this.rejectItemsList=this.allPendingCancelRequest
    }
    console.log("this.allPendingCancelRequest",this.allPendingCancelRequest)
    this.cd.detectChanges();    
  })

}

getAllBankTransaction(){
  this._service.getAllBankTransaction(this.orderDetail.orderId).subscribe(res=>{
    if(res.status==200){
  this.allBankTransaction=res.data
    }
    this.cd.detectChanges();    
  })
}
closeRejectModalPopup(){
  this.orderReturnPopup=false
  this.showReturnRejectRequestPopup=false
}

rejectModalPopup(){
  this.orderReturnPopup=true
  this.returnItems()
}

cancelledReversePickupPopup(val:boolean){
  this.reverseReturnPopup=val
  if(val){
  this.returnItems()
  }
}

cancelledReversePickup(){
  console.log("this.allReturnOrderPending",this.allReturnOrderPending)
  console.log("this.allPendingReturnRequest",this.allPendingReturnRequest)
  const json:any[]=[]
  this.allPendingReturnRequest.forEach((element:any) => {
    const filter:any = this.allReturnOrderPending.filter(item=>item.orderProductId==element.orderProductId)[0]
    json.push({
      facilityCode:element.facilityCode,
      rvpCode:filter.rpCode,
      orderId:element.orderId,
      orderProductId:element.orderProductId,
      returnId:filter.id
    })  
  });
  
  console.log("jsonjsonjsonjson",json)
  this._layoutService.cancelledReversePickup(json).subscribe((res:any)=>{
    this.reverseReturnPopup=false
    if(res.status==200){
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"Reverse Pickup cancelled successfully.",
      popupAction:"Ok",
      popupClass: "alert alert-success",
      popupRoute: "sales/return-orders"
    }) 
  }else{
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"Reverse Pickup can not cancelled.",
      popupAction:"Ok",
      popupClass: "alert alert-danger",
      popupRoute: "sales/return-orders"
    }) 
  }
  this.cd.detectChanges();
  })
}
returnItems(){
  this.allPendingReturnRequest=[]
  this._service.getOrderReturnRequestsByOrderId(this.orderDetail.orderId).subscribe(res=>{
    this.getAllBankTransaction()
    this.allReturnRequest = res.data
    this.allReturnOrderPending = this.allReturnRequest.filter(item=>item.returnStatus==1 && item.rvpCode==null)
    this.isRvpGenerated=this.allReturnOrderPending[0].rpCode!=null?true:false
    this.orderDetail.productList.forEach((element:any) => {
      if(this.allReturnOrderPending.some((item:any)=>item.orderProductId==element.orderProductId)){
      this.allPendingReturnRequest.push(element) 
      }
    });
    if(this.orderDetailsView.creditNoteDiscount!=0){
      this.rejectItemsList=this.allPendingReturnRequest
    }
    console.log("this.allPendingReturnRequest",this.allPendingReturnRequest)
    this.cd.detectChanges();    
  })
}
rejectReturnItems(){
  const json:any[]=[]
  console.log(this.rejectItemsList)
  this.rejectItemsList.forEach((element:any) => {
    json.push({
      orderId:this.orderDetail.orderId,
      orderPrefixId:this.orderDetail.orderPrefixId,
      orderProductId:element.orderProductId,
      orderStatusId:5,
      orderHistoryStatus:22,
      status:3
    })
  });
  console.log("json",json)
  this._service.updateReturnItemList(json).subscribe(res=>{
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"Order Return Items rejected.",
      popupAction:"Ok",
      popupClass: "alert alert-success",
      popupRoute: "sales/return-orders"
    })  
    this.orderReturnPopup=false
    this.showReturnRejectRequestPopup=false
    this.cd.detectChanges();    
  })
}
  
orderCnIdPopup(val:any){
  this.oldOrderIdCn=val
  if(val==true){
    this._layoutService.getCnSourceOd(this.orderDetail.orderId).subscribe((res:any)=>{
      if(res.status==200){
      this.orderOrderCnId=res.data
      }
      this.cd.detectChanges()
    })
  }
}
  
facilityData(){
  this._layoutService.getFacilityData().subscribe((res:any)=>{
    this.facilityDataList=res.data
    this.cd.detectChanges()
  })
}

selectFacility(event:any){
  console.log("data,data",event.target.value)
  this.selectedFacility= event.target.value
}

updateFacility(orderProductId:any){
  console.log(this.selectedFacility, orderProductId)
  const json:any = {
    facilityCode:this.selectedFacility,
    orderProductId:orderProductId
  }
  this._layoutService.updateFacility(json).subscribe((res=>{
    this.popupMessage.next({
      popupShow: true,
      popupHeader:"Message",
      popupMessage:"Facility Code updated.",
      popupAction:"Ok",
      popupClass: "alert alert-success",
      popupRoute: ""
    })  
    this.cd.detectChanges()
  }))
}

viewOrderHistory(orderProdcutId:any, val:any){
  if(orderProdcutId==0){
    this.viewOrderHistoryPopup=val  
}else{
  this._layoutService.orderHistoryViewList(orderProdcutId).subscribe((res:any)=>{
    if(res.status==200){
      this.orderHistoryList=res.data
    }
    this.viewOrderHistoryPopup=val  
    this.cd.detectChanges()
  })
}
  
}


addCancelList(orderProductDetails:any){
  this.cancelList.push({
    orderId: this.orderDetail.orderId,
    orderPrefixId: this.orderDetail.orderPrefixId,
    orderProductId:orderProductDetails.orderProductId,
    productId:orderProductDetails.productId,
    customerId:this.orderDetail.customerId,
    totalAmount:orderProductDetails.refundAmount,
    cancelRequestReason: 'Cancelled',
    cancelRequestRemark: 'Cancelled by Admin',
    paymentMethod:this.orderDetail.paymentMethod,
    itemCode: orderProductDetails.itemCode,
    cancelRequestStatus:this.orderDetail.paymentMethod==2?'CancelledCODOrder':'Pending'
})
}

selectForCancelOrder(event:any, orderProductDetails:any){
  if(event.target.checked){
    this.addCancelList(orderProductDetails)
  }else{
    const findIndex:any = this.cancelList.findIndex((item:any)=>item.orderProductId==orderProductDetails.orderProdcutId)
    this.cancelList.splice(findIndex,1)
  }
}

}
