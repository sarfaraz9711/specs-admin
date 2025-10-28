/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';

@Component({
  selector: 'app-customer-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class CustomerFilterComponent implements OnInit {

  public custftrform: FormGroup;
  public custdate: FormControl;
  public customergroup: FormControl;
  public email: FormControl;
  public customername: FormControl;
  public pageSize: any = 10;
  public offset = 0;
  public pagination = 1;
  @Output() ProgressEmit = new EventEmitter<string>();
  miniDate: any;
  fromDate: string;
  displayStartDate: string;
  todaysDate: any;
  constructor(
    public fb: FormBuilder,
    public sandbox: CustomerSandbox,
    public Sandbox: CustomersGroupSandbox
  ) { }


  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.todaysDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
    };
    this.initForm();
    this.customersGroupList();
  }

  customersGroupList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = '';
    param.count = '';
    this.Sandbox.customersGroupList(param);
  }

  initForm() {
    this.custftrform = this.fb.group({
      customergroup: [null, [Validators.required]],
      email: [null, [Validators.required]],
      custDate: [null, [Validators.required]],
      customername: [null, [Validators.required]]
    });
  }

  reset() {
    if (this.custftrform.value.customergroup || this.custftrform.value.email || this.fromDate || this.custftrform.value.customername || this.custftrform.value.custDate) {
      this.custftrform.reset();
      const param: any = {};
      param.limit = this.pageSize;
      this.custftrform.value.custDate="";
      param.offset = '';
      param.keyword = '';
      this.fromDate = '';
      param.pageSize = this.pageSize;
      this.ProgressEmit.emit(param);
      this.sandbox.customerList(param);
      param.count = 1;
      this.sandbox.paginationCustomer(param);
    }

  }
  onDateSelect(event) {
    this.miniDate = event;
  }

  onSubmit() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.name = this.custftrform.value.customername ? this.custftrform.value.customername : '';
    param.email = this.custftrform.value.email ? this.custftrform.value.email : '';
    param.customerGroup = this.custftrform.value.customergroup ? this.custftrform.value.customergroup : '';
    const form = this.custftrform.value.custDate;
    if (form && form.year) {
      this.fromDate = form ? (form.year) + '-' + ('0' + form.month).slice(-2) + '-' + ('0' + form.day).slice(-2) : null;
    }
    param.date = this.fromDate ? this.fromDate : '';
    this.ProgressEmit.emit(param);
    document.getElementById("focusOut").focus()
  }
}
