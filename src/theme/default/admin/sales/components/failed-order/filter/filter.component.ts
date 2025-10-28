/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FailedOrderSandbox } from '../../../../../../../core/admin/sales/failed-order/failed-order-sandbox';

@Component({
  selector: 'app-sales-failed-order-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FailedOrderFilterComponent implements OnInit {


  public pageSize = '10';
  public salesOrder: FormGroup;
  public submitted = false;
  public name: FormControl;
  public total: FormControl;
  public date: FormControl;
  public orderId: FormControl;
  public offset = 0;
  public pagination = 1;
  @Output() salesEmit = new EventEmitter<string>();
  miniDate: any;
  fromDate: string;
  displayStartDate: string;
  minPickerDate: any;
  maxPickerDate: any;
  startDateval: any;
  public email: FormControl;
  public mobileNo: FormControl;
  public dateTo: FormControl;
  public startdate: FormControl;
  constructor(
    public fb: FormBuilder, public appSandbox: FailedOrderSandbox,
  ) { }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.initForm();
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
  }

  initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.total = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);
    this.orderId = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required]);
    this.mobileNo = new FormControl('', [Validators.required]);
    this.dateTo = new FormControl('', [Validators.required]);
    this.startdate = new FormControl('', [Validators.required]);

    (this.salesOrder = this.fb.group({
      name: this.name,
      date: this.date,
      orderId: this.orderId,
      total: this.total,
      email: this.email,
      mobileNo: this.mobileNo,
      fromDate:this.startdate,
      todate:this.dateTo
    }));
  }

  onDateSelect(event) {
    this.miniDate = event;
  }


  onSubmit() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.orderId = this.salesOrder.value.orderId ? this.salesOrder.value.orderId : '';
    params.customerName = this.salesOrder.value.name ? this.salesOrder.value.name : '';
    if (parseInt(this.salesOrder.value.total, 10).toFixed() === 'NaN') {
      params.totalAmount = '';
    } else {
      params.totalAmount = parseInt(this.salesOrder.value.total, 10).toFixed();
    }
    const form = this.salesOrder.value.date;
    if (form && form.year) {
      this.fromDate = form ? (form.year) + '-' + ('0' + form.month).slice(-2) + '-' + ('0' + form.day).slice(-2) : null;
    }
    params.dateAdded = this.fromDate ? this.fromDate : '';
    params.email = this.salesOrder.value.email ? this.salesOrder.value.email : '';
    params.mobileNo = this.salesOrder.value.mobileNo ? this.salesOrder.value.mobileNo : '';
    params.fromDate = this.startDateval ? this.startDateval : '';
    params.toDate = this.maxPickerDate? this.maxPickerDate : '';
    this.salesEmit.emit(params);
    document.getElementById("focusOut").focus()
  }

  reset() {
    if (this.salesOrder.value.orderId || this.salesOrder.value.name || this.salesOrder.value.email || this.salesOrder.value.mobileNo || this.salesOrder.value.total || this.fromDate || this.salesOrder.value.orderStatusId ||this.startDateval ||this.startDateval ||this.maxPickerDate) {
      this.salesOrder.reset();
      this.salesOrder.value.date="";
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.orderId = '';
      param.customerName = '';
      param.totalAmount = '';
      param.dateAdded = '';
      this.fromDate = '';
      param.email = '';
      param.mobileNo = '';
      param.fromDate = '';
      param.toDate = '';
      this.maxPickerDate='';
      this.startDateval=''
      this.salesEmit.emit(param);
      this.appSandbox.getOrderList(param);
      this.appSandbox.getOrderCount(param);

    }

  }

  onItemChange(data) {
    const params: any = {};
    params.orderId = this.orderId;
    params.orderStatusId = data;
  }
  onToDateSelect(val:any) {
    this.maxPickerDate = val
  }
  onStartDateSelect(val:any) {
    this.startDateval = val
  }
}
