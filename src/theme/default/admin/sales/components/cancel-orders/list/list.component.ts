/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { CancelOrderSandbox } from '../../../../../../../core/admin/sales/cancel-orders/cancel-orders.sandbox';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { CancelOrderService } from 'src/core/admin/sales/cancel-orders/cancel-orders.service';
import { CouponBasedPromotionService } from 'src/core/admin/Promotions/couponBased.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sales-cancel-order-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.css']
})
export class CancelOrderListComponent implements OnInit, OnDestroy {


  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: any;
  public buttonCheck = true;
  public pagination = true;
  public cancelOrderStatus: any;
  public subscriptions: Array<Subscription> = [];
  public offset: any;
  public pageSize = '5';
  public keyword = '';
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  queryData: any = {};
  orderList: any;
  showAction: boolean = true;
  actualOrderList: any;
  maxPickerDate: any;
  startDateval: any;
  keywordInput: FormControl;
  public name: FormControl;
  public email: FormControl;
  public mobileNo: FormControl;
  public dateTo: FormControl;
  public newstartdate: FormControl;
  public paymentList: FormGroup;
  fromDate: any;
  toDate: any;
  status:any;
  endDate: string;
  startDate: string;
  public buttonActive = false;
  public filterEnable = true;
  public checkOrderData = [];


  constructor(
    public sandbox: CancelOrderSandbox,
    public layoutSandbox: LayoutSandbox,
    public orderStatusSandbox: OrderstatusSandbox,
    public cd: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    private _service: CancelOrderService,
    private _couponBasedPromotionService: CouponBasedPromotionService,
    private toastr: ToastrManager,
    private _router: Router,
    private excelService : ExcelService,
    public fb: FormBuilder,

  ) { }

  ngOnInit() {
    sessionStorage.removeItem("cancelReturnOrderId");
    sessionStorage.removeItem("cancelReturnOrderProductId");
    sessionStorage.removeItem("ACTION");
    sessionStorage.removeItem("isReplaceOrder")
    sessionStorage.removeItem("json")
    sessionStorage.removeItem("returnRequestData")
    sessionStorage.removeItem("replaceOrderPreId")
    sessionStorage.removeItem("returnRequestId")
    sessionStorage.removeItem("cancelReturnOrderPrefixId");
    sessionStorage.removeItem("returnOrderItemPrice");
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    // this.offset = 0;
    this.pageSize = localStorage.getItem('itemsPerPage') ? localStorage.getItem('itemsPerPage') : this.pageSize;
    this.getOrderList("Pending")
    // this.getCancelOrderList();
    // this.getOrderStatusList();
    // this.getAcceptedCount();
    // this.getRejectedCount();
    this.initForm();
    this.getCancelRequest();

  }
  initForm() {
    this.keywordInput = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.mobileNo = new FormControl('', [Validators.required]);
    this.dateTo = new FormControl('', [Validators.required]);
    this.newstartdate = new FormControl('', [Validators.required]);
    this.status = new FormControl('', [Validators.required]);


    this.paymentList = this.fb.group({
      keywordInput: this.keywordInput,
      name: this.name,
      email: this.email,
      mobileNo: this.mobileNo,
      fromDate:this.newstartdate,
      todate:this.dateTo,
      status:this.status

    });
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
    if (event.target.checked) {
      this.buttonActive = false;
      this.buttonCheck = event.target.checked;
      this.filterEnable = true;
    } else {
      this.buttonActive = true;
      this.buttonCheck = event.target.checked;
      this.filterEnable = false;
    }
  }

  getCancelOrderList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = '';
    this.sandbox.getCancelOrderList(params);
    this.getCancelOrderListCount();
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  getCancelOrderListCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = 1;
    this.sandbox.cancelOrderListCount(params);
  }

  getAcceptedCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = 1;
    params.status = 1;
    this.sandbox.getAcceptedCount(params);
  }

  getRejectedCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = 1;
    params.status = 2;
    this.sandbox.getRejectedCount(params);
  }

  getOrderStatusList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = 0;
    params.keyword = '';
    this.orderStatusSandbox.orderStatusList(params);
  }

  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.name;
  }

  changeStatus(list, event) {
    const params: any = {};
    params.cancelStatusId = event.value;
    params.orderProductId = list.orderProductId;
    this.sandbox.changeCancelOrderStatus(params);
    this.subscriptions.push(this.sandbox.changeCancelOrderStatus$.subscribe(data => {
      if (data && data.status === 1) {
        this.cd.detectChanges();
        this.getAcceptedCount();
        this.getRejectedCount();
      }
    }));
  }

  changeBulkStatus(event) {
    const params: any = {};
    params.orderProductId = this.checkedData.toString();
    params.cancelStatusId = event.value;
    this.sandbox.bulkCancelOrderStatus(params);
    this.subscriptions.push(this.sandbox.bulkStatusChangeLoaded$.subscribe(data => {
      if (data && data === true) {
        this.cd.detectChanges();
        this.getAcceptedCount();
        this.getRejectedCount();
      }
    }));
  }

  selectChkBox(event, orderId) {
    if (event.target.checked === true) {
      this.checkedData.push(orderId);
    }
    if (event.target.checked === false) {
      this.unCheckData.push(orderId);
      this.unCheckData.forEach((value, index) => {
        this.checkedData = this.checkedData.filter(_value => {
          if (value === _value) {
            return false;
          } else {
            return true;
          }
        });
      });

    }
    this.unCheckData = [];
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getCancelOrderList();
  }

  exportExcel() {
    const params: any = {};
    params.orderProductId = this.checkedData;
    this.sandbox.exportCancelOrder(params);
  }

  exportAllExcel() {
    const params: any = {};
    this.sandbox.exportBulkCancelOrder(params);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

getOrderList(requestStatus:string){
  this.status = requestStatus
// const params ="?request_status="+requestStatus
if(requestStatus == 'Pending'){
  this.showAction = true;
}else{
  this.showAction = false;
}
  // this._service.getOrderCancelRequests(params).subscribe((res:any)=>{
  //  var myArray = res.data;
  //   myArray.sort(function(a, b) {
  //     return (a.Id > b.Id) ? -1 : ((a.Id < b.Id) ? 1 : 0);
  // });
  //   this.orderList = myArray
  //   this.actualOrderList = myArray
  //   this.cd.detectChanges();
  // })
}

changeOrderStatus(data:any, action:any){
  console.log(data)
  let json:any = {
    "orderId":data.orderId,
    "saleOrderCode":data.orderPrefixId,
    "cancellationReason":"APPROVED_BY_BACKEND",
    "cancellationRemark":""
  }
  let statusId:number;
  if(action==1){
    json.cancellationRemark="Approved"
    statusId=9
  }
  else{
    json.cancellationRemark="Rejected"
    statusId=10
  }
  this._service.cancelOrderRequest(json).subscribe((res:any)=>{
    if(res.status != 0){
    const findIndex = this.orderList.findIndex(item=>item.orderId==data.orderId)
    console.log(findIndex)
    this.orderList[findIndex].orderStatusId=statusId=statusId
    console.log(this.orderList)
    this.cd.detectChanges();
  }
  })
}
createCreditNote(data:any){
sessionStorage.setItem("creditNoteData",JSON.stringify(data))
this.router.navigate(["/promotions/coupon-based/add"])
}

checkStatusOnUc(data:any, action:any){
  if(data.orderPrefixId){
    this._service.getSaleOrder(data.orderPrefixId).subscribe((res:any) => {
      console.log("sangeeta", res)
      if(res.data == "ORDER_NOT_FOUND_ON_UC"){
        console.log(res.message)
        this.toastr.errorToastr("Sale order not found. Please wait for the order syncing from the UC");

      }else{
        this.changeOrderStatus(data,action)
      }
    })

  }
}

gotoOrderDetailPage(orderData:any){
  console.log(orderData, "Nero order data")
  sessionStorage.setItem("ACTION", "CANCEL_ORDER");
  sessionStorage.setItem("cancelReturnOrderPrefixId", orderData.orderPrefixId);
  sessionStorage.setItem("cancelReturnOrderId", orderData.orderId);
  sessionStorage.setItem("cancelOrderRequestId", orderData.Id);
  this._router.navigate(['/sales/orders/vieworder', orderData.orderId], { queryParams: {index:0, offset:0} });
}
searchcancel(val:any, check:number){
  if(check==1){
  this.orderList = this.actualOrderList.filter((item:any)=>{
    return item.orderPrefixId==val
  })
}else{
  this.orderList=this.actualOrderList
}
}

checkOrder(event, list) {
  if(event.target.checked==true){
   this.checkOrderData.push(list);
  }else{
   const getIndex= this.checkOrderData.findIndex(item=>item.orderId==list.orderId)
   this.checkOrderData.splice(getIndex,1)
  }
 }
exportAsXLSX(){
  console.log("return order data ", this.orderList);

  let orderExportData:any;
  if(this.checkOrderData.length>0){
   orderExportData=this.checkOrderData;
  }else{
     orderExportData=this.orderList;

  }

  // const result = this.orderList.map(({orderPrefixId, total, shippingFirstname,orderCancelReson,orderCancelRemark, createdDate}) => ({orderPrefixId, total, shippingFirstname,orderCancelReson,orderCancelRemark, createdDate}));
  let orderData:any[]=[]
  orderExportData.forEach((item:any,i)=>{
    const orderStatus:any = (this.orderList.filter(it=>it.orderStatusId==item.orderStatusId))[0]
    orderData.push({
      "Order Id": item.orderPrefixId,"Total":item.total,"Customer Name": item.shippingFirstname,"Email": item.email,"Mobile": item.mobile,"Reason": item.orderCancelReson,"Remarks": item.orderCancelRemark,"Date": item.createdDate
    })
  })
 this.excelService.exportAsExcelFile(orderData, 'Cancel_order_report')
}

viewOrders(orderId) {
  this.router.navigate(['/sales/orders/vieworder', orderId], { queryParams: this.queryData });
}

getCancelRequest() {
  console.log("data",this.status,this.keywordInput.value, this.keywordInput)
  if(this.status.value == ""){
    this.status = "pending"
  }else{
    this.status
  }
  const params: any = {};
  params.request_status=this.status;
  params.orderId = this.keywordInput.value == '' || this.keywordInput.value == null?'':this.keywordInput.value;
  params.customerName = this.name.value == ''?'':this.name;
  params.email = this.email.value == ''?'':this.email;
  params.mobileNo = this.mobileNo.value == ''?'':this.mobileNo;
  params.fromDate = this.startDateval?this.startDateval:'';
  params.toDate = this.maxPickerDate?this.maxPickerDate:'';

   this._service.getOrderCancelRequests(params).subscribe((res:any)=>{
   var myArray = res.data;
    myArray.sort(function(a, b) {
      return (a.Id > b.Id) ? -1 : ((a.Id < b.Id) ? 1 : 0);
  });
    this.orderList = myArray
    this.actualOrderList = myArray
    this.cd.detectChanges();
  })
  this.queryData.offset = this.offset || 0;
  this.queryData.index = this.index || 0;
  this.router.navigate(
    [],
    {
      relativeTo: this.route,
      queryParams: this.queryData,
      queryParamsHandling: 'merge', 
    });
}

onSubmit() {
  const formData = this.paymentList.value;
  this.keyword = this.paymentList.value.keywordInput ? this.paymentList.value.keywordInput : '';  
  this.name = this.paymentList.value.name ? this.paymentList.value.name : '';
  this.email = this.paymentList.value.email ? this.paymentList.value.email : '';
  this.mobileNo = this.paymentList.value.mobileNo ? this.paymentList.value.mobileNo : '';
  this.fromDate = this.startDateval ? this.startDateval : '';
  this.toDate = this.maxPickerDate ? this.maxPickerDate : '';
  this.status = this.status ? this.status : '';
 
  if (this.keyword !== '' ||this.paymentList.value.name||this.paymentList.value.email|| this.paymentList.value.mobileNo||this.startDateval ||this.maxPickerDate || this.status) {
    this.getCancelRequest();
  }
  document.getElementById("focusOut").focus();
}

reset() {
  this.paymentList.reset();
  this.fromDate = '';
  this.keyword = '';
  this.toDate = '';
  this.endDate = '';
  this.startDate = '';
  this.name = null;
  this.email = null;
  this.mobileNo = null;
  this.startDateval ='';
  this.maxPickerDate ='';
  this.status = 'pending';
  this.getCancelRequest();
}
onToDateSelect(val:any) {
  this.maxPickerDate = val
}
onStartDateSelect(val:any) {
  this.startDateval = val
}

}
