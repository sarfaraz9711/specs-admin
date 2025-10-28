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
  OnDestroy,
} from '@angular/core';
import { PaymentsSandbox } from '../../../../../../../core/admin/sales/payments/payments.sandbox';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { DeleteConfirmationDialogComponent } from '../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from 'src/core/admin/reports/excelfacility.service';


@Component({
  selector: 'app-sales-payment-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '1'
      })),
      transition('initial=>final', animate('750ms')),
      transition('final=>initial', animate('750ms'))
    ]),
  ]
})
export class PaymentListComponent implements OnInit, OnDestroy {


  public buttoncheck = true;
  public buttonActive = false;
  public filterEnable = true;
  // pagination
  public pageSize;
  public offset: any = 0;
  public index: any = 0;
  public keyword: string;
  public fromDate: string;
  public toDate: string;
  public PaymentMode: string;
  private isCount: boolean;
  // pagination
  public previousSort = {};
  public selectedSortField = '';
  public currentPage = 1;
  public paymentList: FormGroup;
  public submitted = false;
  public keywordInput: FormControl;
  public fromDateInput: FormControl;
  public toDateInput: FormControl;
  public paymentMethod: FormControl;
  public isCollapsed = [];
  public isChecked: any = [];
  public checkedData: any = [];
  public sampleArray: any = [];
  public bulkFunction = false;
  public selectedAll:any;
  public paymentListData:any=[];
  private subscriptions: Array<Subscription> = [];
  queryData: any = {};
  miniDate: any;
  displayStartDate: string;
  displayEndDate: string;
  startDate: string;
  endDate: string;
  todaysDate: any;
  maxPickerDate: any;
  startDateval: any;
  public name: FormControl;
  public email: FormControl;
  public mobileNo: FormControl;
  public dateTo: FormControl;
  public newstartdate: FormControl;
  public checkOrderData = [];

  constructor(
    public sandbox: PaymentsSandbox,
    public fb: FormBuilder,
    public modalService: NgbModal,
    public route: ActivatedRoute,
    public router: Router,
    private excelService: ExcelService,


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
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.keyword = '';
    this.fromDate = '';
    this.toDate = '';
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.getPaymentList();
    this.getPaymentListCount();
    this.initForm();
    this.paymentmode();

  }

  getPaymentList() {
    console.log("data", this.PaymentMode, this.keywordInput, this.keywordInput?.value)
    const params: any = {};
    params.orderId = this.keywordInput == undefined?'':this.keywordInput?.value;
    params.offset = this.offset;
    params.limit = this.pageSize;
    // params.startDate = this.fromDate;
    // params.endDate = this.toDate;
    params.paymentMethod = this.PaymentMode;
    params.customerName = this.name;
    params.email = this.email;
    params.mobileNo = this.mobileNo;
    params.fromDate = this.startDateval;
    params.toDate = this.maxPickerDate;
    console.log("payment", params)
    this.sandbox.getPaymentList(params);
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.sandbox.paymentList$.subscribe(data=>{
      this.paymentListData=data;
    })
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  getPaymentListCount() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.customerName = this.keyword;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    params.paymentMethod = this.PaymentMode;
    this.sandbox.getPaymentListCount(params);
  }
  paymentmode() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = 0;
    params.keyword = 'payment';
    this.sandbox.GetPaymentMode(params);
  }
  check(event) {
    if (event.target.checked) {
      this.buttonActive = false;
      this.buttoncheck = event.target.checked;
      this.filterEnable = true;
    } else {
      this.buttonActive = true;
      this.buttoncheck = event.target.checked;
      this.filterEnable = false;
    }
  }

  /**
   * Handles form 'onPageChange' event. when page changes
   * @param event form event
   */
  pageChange(event) {
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = event.pageSize * event.pageIndex;
    this.index = event.pageIndex;
    this.getPaymentList();
    this.selectedAll=false;
    this.checkedData=[];
    this.isChecked=[]
  }

  initForm() {
    this.keywordInput = new FormControl('', [Validators.required]);
    this.fromDateInput = new FormControl('', [Validators.required]);
    this.toDateInput = new FormControl('', [Validators.required]);
    this.paymentMethod = new FormControl(null, [Validators.required]);
    this.name = new FormControl(null, [Validators.required]);
    this.email = new FormControl(null, [Validators.required]);
    this.mobileNo = new FormControl(null, [Validators.required]);
    this.dateTo = new FormControl('', [Validators.required]);
    this.newstartdate = new FormControl('', [Validators.required]);


    this.paymentList = this.fb.group({
      keywordInput: this.keywordInput,
      fromDateInput: this.fromDateInput,
      toDateInput: this.toDateInput,
      paymentMethod: this.paymentMethod,
      name: this.name,
      email: this.email,
      mobileNo: this.mobileNo,
      fromDate:this.newstartdate,
      todate:this.dateTo

    });
  }
  onDateSelect(event) {
    this.miniDate = event;
  }

  viewOrders(orderId) {
    this.router.navigate(['/sales/orders/vieworder', orderId], { queryParams: this.queryData });
  }
  
  onSubmit() {
    this.keyword = this.paymentList.value.keywordInput ? this.paymentList.value.keywordInput : '';
    const form = this.paymentList.value.fromDateInput;
    const to = this.paymentList.value.toDateInput;
    if (form && form.year) {
      this.startDate = form.year + '-' + form.month + '-' + form.day;
      this.displayStartDate = form.day + '-' + form.month + '-' + form.year;
    }
    if (to && to.year) {
      this.endDate = to.year + '-' + to.month + '-' + to.day;
      this.displayEndDate = to.day + '-' + to.month + '-' + to.year;
    }
    this.fromDate = this.startDate ? this.startDate : '';
    this.toDate = this.endDate ? this.endDate : '';
    this.name = this.paymentList.value.name ? this.paymentList.value.name : '';
    this.email = this.paymentList.value.email ? this.paymentList.value.email : '';
    this.mobileNo = this.paymentList.value.mobileNo ? this.paymentList.value.mobileNo : '';
    this.fromDate = this.startDateval ? this.startDateval : '';
    this.toDate = this.maxPickerDate ? this.maxPickerDate : '';


    // this.fromDate = this.paymentList.value.fromDateInput ? this.paymentList.value.fromDateInput: '';
    // this.toDate = this.paymentList.value.toDateInput ? this.paymentList.value.toDateInput : '';
    this.PaymentMode = this.paymentList.value.paymentMethod ? this.paymentList.value.paymentMethod : '';
    if (this.keyword !== '' || this.fromDate !== '' || this.toDate !== '' || this.PaymentMode !== '' ||this.paymentList.value.name||this.paymentList.value.email|| this.paymentList.value.mobileNo||this.startDateval ||this.maxPickerDate ) {
      this.getPaymentList();
      this.getPaymentListCount();
    }
    document.getElementById("focusOut").focus()
  }

  reset() {
      this.paymentList.reset();
      this.offset = 0;
      this.fromDate = '';
      this.keyword = '';
      this.toDate = '';
      this.endDate = '';
      this.startDate = '';
      this.PaymentMode = '';
      this.isCount = true;
      this.name = null;
      this.email = null;
      this.mobileNo = null;
      this.startDateval ='';
      this.maxPickerDate ='';
      this.paymentList.value.name = '';
      this.paymentList.value.email = '';
      this.paymentList.value.mobileNo = '';
      this.getPaymentList();
      this.getPaymentListCount();
    

  }

  selectChkBox(event, paymentId) {
    if (event.target.checked === true) {
      this.checkedData.push(paymentId);
      this.bulkFunction = true;
      if(this.checkedData.length === this.paymentListData.length){
        this.selectedAll=true;
        this.isChecked[paymentId]=this.selectedAll;
      }

    } else if (event.target.checked === false) {
      this.checkedData = this.checkedData.filter(data => {
        if (data !== paymentId) {
          return true;
        }
      });
      if (this.checkedData.length === 0) {
        this.bulkFunction = false;
      }
      if(this.checkedData.length!==this.paymentListData.length){
        this.selectedAll=false;
        this.isChecked[paymentId]=this.selectedAll;
      }

    }
  }

  selectAll(event: any, vendor) {
    this.checkedData = [];
    vendor.forEach(values => {
      if (event.target.checked === false) {
        this.isChecked[values.paymentId] = false;
        this.sampleArray = [];
        this.checkedData = [];
        this.bulkFunction = false;

      } else {
        this.isChecked[values.paymentId] = true;
        this.sampleArray.push(values.paymentId);
        this.bulkFunction = true;
        this.checkedData.push(values.paymentId);

      }
    });
  }

  exportExcel() {
    const param: any = {};
    param.paymentId = this.checkedData;
    this.sandbox.exportPayment(param);
  }

  exportAllExcel() {
    const param: any = {};
    this.sandbox.exportAllPayment(param);
  }

  downloadInvoice(orderId: any, orderPrefixId: any) {
    const params: any = {};
    params.orderId = orderId;
    params.orderPrefixId = orderPrefixId;
    this.sandbox.downloadInvoice(params);
  }

  archivePayment(list) {
    const params: any = {};
    params.paymentId = list.paymentId;
    this.sandbox.makePaymentArchive(params);
    this.subscriptions.push(this.sandbox.makePaymentArchiveLoaded$.subscribe(data => {
      if (data && data === true) {
        this.getPaymentList();
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
  onToDateSelect(val:any) {
    this.maxPickerDate = val
  }
  onStartDateSelect(val:any) {
    this.startDateval = val
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
    let orderExportData:any;
    if(this.checkOrderData.length>0){
     orderExportData=this.checkOrderData;
    }else{
       orderExportData=this.paymentListData;

    }
    
    let orderData:any[]=[]
    orderExportData.forEach((item:any)=>{
      const orderStatus:any = (this.paymentListData.filter(it=>it.orderStatusId==item.orderStatusId))[0]
      orderData.push({
       "Order Id": item.orderPrefixId,"Customer Name": item.shippingFirstname,"Email": item.email,"Mobile": item.telephone,"Payment Date": item.createdDate,"Transaction Id": item.paymentDetails+"  "+item.paymentType,"Amount": item.total
      })
    })
    this.excelService.exportAsExcelFile(orderData, 'payment-report')
}

}
