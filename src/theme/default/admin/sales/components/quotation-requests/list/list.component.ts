/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { QuotationRequestSandbox } from '../../../../../../../core/admin/sales/quotation-request/quotation-request.sandbox';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sales-quotation-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss'],
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
export class QuotationListComponent implements OnInit, OnDestroy {


  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: any;
  public buttonCheck = true;
  public pagination = true;
  public cancelOrderStatus: any;
  public subscriptions: Array<Subscription> = [];
  public quotationForm: FormGroup;
  public submitted = false;
  public buttoncheck = true;
  public buttonActive = false;
  public filterEnable = true;
  public isCollapsed = [];
  public checkedData: any = [];
  public sampleArray: any = [];
  public isChecked: any = [];
  public bulkFunction = false;
  public offset: any;
  public pageSize = '5';
  public keyword = '';
  public checkCondition: any = [];
  public checkmodules: any = [];
  public unCheckData: any = [];
  public fromDate = '';
  public toDate = '';
  public queryData: any = {};
  miniDate: any;
  displayStartDate: string;
  displayEndDate: string;
  todaysDate: any;


  constructor(
    public sandbox: QuotationRequestSandbox,
    private toastr: ToastrManager,
    public layoutSandbox: LayoutSandbox,
    public fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router


  ) { }

  ngOnInit() {
    // this.offset = 0;
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
    this.pageSize = localStorage.getItem('itemsPerPage') ? localStorage.getItem('itemsPerPage') : this.pageSize;
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.getQuotationList();
    this.initForm();
  }

  initForm() {
    this.quotationForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  getQuotationList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.productName = this.keyword;
    params.count = '';
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.sandbox.quotationList(params);
    this.getQuotationListCount();
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

  getQuotationListCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.productName = this.keyword;
    params.count = 1;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.sandbox.quotationListCount(params);
  }

  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.name;
    this.fromDate = event.fromDate;
    this.toDate = event.toDate;
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getQuotationList();
  }
  onDateSelect(event) {
    this.miniDate = event;
  }

  onSubmit() {
    this.keyword = this.quotationForm.value.name ? this.quotationForm.value.name : '';
    const form = this.quotationForm.value.startDate;
    const to = this.quotationForm.value.endDate;
    if (form && form.year) {
      this.fromDate = form.year + '-' + form.month + '-' + form.day;
      this.displayStartDate = form.day + '-' + form.month + '-' + form.year;
    }
    if (to && to.year) {
      this.toDate = to.year + '-' + to.month + '-' + to.day;
      this.displayEndDate = to.day + '-' + to.month + '-' + to.year;
    }
    // this.fromDate = this.quotationForm.value.startDate ? this.quotationForm.value.startDate : '';
    // this.toDate = this.quotationForm.value.endDate ? this.quotationForm.value.endDate : '';
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.productName = this.keyword;
    param.count = '';
    param.startDate = this.fromDate ? this.fromDate : '';
    param.endDate = this.toDate ? this.toDate : '';
    if (this.keyword !== '' || this.fromDate !== '' || this.toDate !== '') {
      this.sandbox.quotationList(param);
      this.getQuotationListCount();
    }

  }

  reset() {
    if (this.quotationForm.value.startDate || this.quotationForm.value.endDate || this.quotationForm.value.name) {
      this.keyword = '';
      this.quotationForm.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.productName = '';
      param.count = '';
      param.startDate = '';
      param.endDate = '';
      this.fromDate = '';
      this.toDate = '';
      this.getQuotationList();
    }

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

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
