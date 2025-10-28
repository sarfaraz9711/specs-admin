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
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ArchivePaymentSandbox } from '../../../../../../../core/admin/sales/archive-payments/archive-payments.sandbox';
import { ActivatedRoute, Router } from '@angular/router';


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
export class ArchivePaymentListComponent implements OnInit, OnDestroy {


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
  public isCollapsed = [];
  public isChecked: any = [];
  public checkedData: any = [];
  public sampleArray: any = [];
  public bulkFunction = false;
  public selectedAll:any;
  public paymentArchiveData:any=[];
  private subscriptions: Array<Subscription> = [];
  queryData: any = {};
  miniDate: any;
  displayStartDate: string;
  displayEndDate: string;
  startDate: string;
  endDate: string;
  minPickerDate: any;
  constructor(
    public sandbox: ArchivePaymentSandbox,
    public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.keyword = '';
    this.fromDate = '';
    this.toDate = '';
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.getArchivePaymentList();
    this.getArchivePaymentListCount();
    this.initForm();
  }

  getArchivePaymentList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.customerName = this.keyword;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.sandbox.archivePaymentList(params);
    this.queryData.offset = this.offset || 0;
    this.queryData.index = this.index || 0;
    this.sandbox.archivePaymentList$.subscribe(data=>{
      this.paymentArchiveData=data;
    })
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.queryData,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  getArchivePaymentListCount() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.customerName = this.keyword;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.sandbox.archivePaymentListCount(params);
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
    this.getArchivePaymentList();
    this.selectedAll=false;
    this.checkedData=[];
    this.isChecked=[];
  }

  initForm() {
    this.keywordInput = new FormControl('', [Validators.required]);
    this.fromDateInput = new FormControl('', [Validators.required]);
    this.toDateInput = new FormControl('', [Validators.required]);
    this.paymentList = this.fb.group({
      keywordInput: this.keywordInput,
      fromDateInput: this.fromDateInput,
      toDateInput: this.toDateInput,
    });
  }
  onDateSelect(event) {
    this.miniDate = event;
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
    if (this.keyword !== '' || this.fromDate !== '' || this.toDate !== '') {
      this.getArchivePaymentList();
      this.getArchivePaymentListCount();
    }

  }

  reset() {
    if (this.paymentList.value.keywordInput || this.paymentList.value.fromDateInput || this.paymentList.value.toDateInput) {
      this.paymentList.reset();
      this.offset = 0;
      this.fromDate = '';
      this.startDate = '';
      this.endDate = '';
      this.keyword = '';
      this.toDate = '';
      this.isCount = true;
      this.getArchivePaymentList();
      this.getArchivePaymentListCount();
    }

  }

  selectChkBox(event, paymentId) {
    if (event.target.checked === true) {
      this.checkedData.push(paymentId);
      this.bulkFunction = true;
      if(this.checkedData.length===this.paymentArchiveData.length){
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
      if(this.checkedData.length!==this.paymentArchiveData.length){
        this.selectedAll=false;
        this.isChecked[paymentId]=this.selectedAll;
      }

    }
  }

  selectAll(event: any, payment) {
    this.checkedData = [];
    payment.forEach(values => {
      if (event.target.checked === false) {
        this.isChecked[values.paymentArchiveId] = false;
        this.sampleArray = [];
        this.checkedData = [];
        this.bulkFunction = false;

      } else {
        this.isChecked[values.paymentArchiveId] = true;
        this.sampleArray.push(values.paymentArchiveId);
        this.bulkFunction = true;
        this.checkedData.push(values.paymentArchiveId);

      }
    });
  }

  exportExcel() {
    const param: any = {};
    param.paymentArchiveId = this.checkedData;
    this.sandbox.exportArchivePayment(param);
  }

  exportAllExcel() {
    const param: any = {};
    this.sandbox.exportAllArchivePayment(param);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
