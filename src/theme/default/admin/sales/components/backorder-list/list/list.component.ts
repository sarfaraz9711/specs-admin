/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackorderListSandbox } from '../../../../../../../core/admin/sales/backorder-list/backorder-list.sandbox';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sales-backorder-list',
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
export class BackorderListComponent implements OnInit, OnDestroy {


  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: any;
  public buttonCheck = true;
  public backorderForm: FormGroup;
  public submitted = false;
  public buttoncheck = true;
  public buttonActive = false;
  public filterEnable = true;
  public isCollapsed = [];
  public checkedData: any = [];
  public isChecked: any = [];
  public offset: any;
  public pageSize = '5';
  public keyword = '';
  public unCheckData: any = [];
  queryData: any = {};

  constructor(
    public sandbox: BackorderListSandbox,
    public route: ActivatedRoute,
    public router: Router,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.offset = 0;
    this.offset = this.route.snapshot.queryParamMap.get('offset') || 0;
    this.index = this.route.snapshot.queryParamMap.get('index');
    this.pageSize = localStorage.getItem('itemsPerPage') ? localStorage.getItem('itemsPerPage') : this.pageSize;
    this.getBackOrderList();
    this.initForm();
  }

  initForm() {
    this.backorderForm = this.fb.group({
      name: ['', Validators.required],
    });
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

  getBackOrderList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = '';
    this.sandbox.backOrderList(params);
    this.getBackOrderListCount();
  }

  getBackOrderListCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.keyword = this.keyword;
    params.count = 1;
    this.sandbox.backOrderListCount(params);

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

  onSubmit() {
    this.keyword = this.backorderForm.value.name ? this.backorderForm.value.name : '';
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = this.keyword;
    param.count = '';
    if (this.keyword !== '') {
      this.sandbox.backOrderList(param);
      this.getBackOrderListCount();
    }

  }

  reset() {
    if (this.backorderForm.value.name) {
      this.keyword = '';
      this.backorderForm.reset();
      const param: any = {};
      param.limit = this.pageSize;
      param.offset = '';
      param.productName = '';
      param.count = '';
      param.startDate = '';
      param.endDate = '';
      this.getBackOrderList();
    }
  }


  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getBackOrderList();
  }

  ngOnDestroy() {
  }

}
